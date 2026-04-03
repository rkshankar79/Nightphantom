import type { TrinityProductLine } from "@/lib/sanity/fetch";
import type { ProductsByEffect, TrinityPowerId } from "@/lib/sanity/types";

const FORMAT_ORDER = ["flower", "preroll", "vape"] as const;

export type TrinitySkuRow =
  | { kind: "single"; product: TrinityProductLine }
  | {
      kind: "group";
      effect: TrinityPowerId;
      format: string;
      products: TrinityProductLine[];
    };

export function groupProductsByEffect(
  products: TrinityProductLine[],
): ProductsByEffect {
  const out: ProductsByEffect = {};
  for (const p of products) {
    const e = p.effect as TrinityPowerId;
    if (e !== "dawn" && e !== "twilight" && e !== "dusk") continue;
    if (!out[e]) out[e] = [];
    out[e]!.push(p);
  }
  return out;
}

/** One Trinity list row per format line; multiple SKUs with same effect+format collapse to a group link. */
export function rowsByEffectForTrinity(
  productsByEffect: ProductsByEffect,
): Record<TrinityPowerId, TrinitySkuRow[]> {
  const powers: TrinityPowerId[] = ["dawn", "twilight", "dusk"];
  const result = {} as Record<TrinityPowerId, TrinitySkuRow[]>;

  for (const effect of powers) {
    const list = productsByEffect[effect]?.filter(Boolean) ?? [];
    const byFormat = new Map<string, TrinityProductLine[]>();
    for (const p of list) {
      const f = p.format || "other";
      const arr = byFormat.get(f) ?? [];
      arr.push(p);
      byFormat.set(f, arr);
    }

    const rows: TrinitySkuRow[] = [];
    const seen = new Set<string>();

    for (const fmt of FORMAT_ORDER) {
      const group = byFormat.get(fmt);
      if (!group?.length) continue;
      seen.add(fmt);
      if (group.length === 1) {
        rows.push({ kind: "single", product: group[0]! });
      } else {
        rows.push({ kind: "group", effect, format: fmt, products: group });
      }
    }

    for (const [fmt, group] of byFormat) {
      if (seen.has(fmt) || !group.length) continue;
      if (group.length === 1) {
        rows.push({ kind: "single", product: group[0]! });
      } else {
        rows.push({ kind: "group", effect, format: fmt, products: group });
      }
    }

    result[effect] = rows;
  }

  return result;
}
