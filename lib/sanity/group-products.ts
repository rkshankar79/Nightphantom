import type { TrinityProductLine } from "@/lib/sanity/fetch";
import type { ProductsByEffect, TrinityPowerId } from "@/lib/sanity/types";

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
