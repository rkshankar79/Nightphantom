"use client";

import Link from "next/link";
import { useCallback, useId, useState } from "react";
import { useLocale } from "@/components/locale-context";
import { pickListingLabel } from "@/lib/i18n/product-copy";
import type { Messages } from "@/lib/i18n/types";
import type { TrinitySkuRow } from "@/lib/sanity/group-products";
import type { TrinityPowerId } from "@/lib/sanity/types";

export type { TrinityPowerId as PowerId };

const POWER_ORDER: TrinityPowerId[] = ["dawn", "twilight", "dusk"];

type Props = {
  skuRowsByEffect: Record<TrinityPowerId, TrinitySkuRow[]>;
};

function formatLineWord(format: string, pm: Messages["product"]): string {
  if (format === "flower") return pm.formatFlower;
  if (format === "preroll") return pm.formatPreroll;
  return pm.formatVape;
}

export function TrinityCards({ skuRowsByEffect }: Props) {
  const { locale, messages: t } = useLocale();
  const [openId, setOpenId] = useState<TrinityPowerId | null>(null);
  const sectionLabelId = useId();
  const tr = t.trinity;

  const toggle = useCallback((id: TrinityPowerId) => {
    setOpenId((cur) => (cur === id ? null : id));
  }, []);

  return (
    <section
      className="trinity-section"
      id="trinity"
      aria-labelledby={sectionLabelId}
    >
      <div className="trinity-bg" aria-hidden />
      <div className="trinity-inner">
        <div className="trinity-intro">
          <p className="section-label trinity-section-label" id={sectionLabelId}>
            {tr.sectionLabel}
          </p>
          <h2 className="trinity-headline">{tr.headline}</h2>
          <p className="trinity-lede">{tr.lede}</p>
        </div>

        <div className="trinity-grid" role="list">
          {POWER_ORDER.map((id) => {
            const p = tr.powers[id];
            const theme =
              id === "dawn"
                ? "trinity-dawn"
                : id === "twilight"
                  ? "trinity-twilight"
                  : "trinity-dusk";
            const expanded = openId === id;
            const rows = skuRowsByEffect[id] ?? [];
            return (
              <div key={id} className={`trinity-card-wrap ${theme}`} role="listitem">
                <button
                  type="button"
                  className={`trinity-card ${theme} ${expanded ? "is-open" : ""}`}
                  onClick={() => toggle(id)}
                  aria-expanded={expanded}
                  aria-controls={`trinity-panel-${id}`}
                  id={`trinity-trigger-${id}`}
                >
                  <span className="trinity-card-shimmer" aria-hidden />
                  <span className="trinity-card-type">{p.type}</span>
                  <span className="trinity-card-title">{p.title}</span>
                  <span className="trinity-card-focus">{p.focus}</span>
                  <span className="trinity-card-hint">
                    {expanded ? tr.tapCollapse : tr.tapReveal}
                  </span>
                </button>

                <div
                  id={`trinity-panel-${id}`}
                  role="region"
                  aria-labelledby={`trinity-trigger-${id}`}
                  aria-hidden={!expanded}
                  className={`trinity-panel ${expanded ? "is-open" : ""}`}
                >
                  <ul className="trinity-sku-list">
                    {rows.length > 0
                      ? rows.map((row) => {
                          if (row.kind === "single") {
                            const item = row.product;
                            return (
                              <li key={item._id}>
                                <Link
                                  href={`/products/${item.slug}`}
                                  className="trinity-product-link"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {pickListingLabel(item, locale)}
                                </Link>
                              </li>
                            );
                          }
                          const fmt = formatLineWord(row.format, t.product);
                          const linkText = `${p.title} ${fmt}`.toUpperCase();
                          const aria = `${linkText}, ${tr.skuGroupCount.replace(
                            "{count}",
                            String(row.products.length),
                          )}`;
                          return (
                            <li key={`group-${row.effect}-${row.format}`}>
                              <Link
                                href={`/products/line/${row.effect}/${row.format}`}
                                className="trinity-product-link"
                                aria-label={aria}
                                onClick={(e) => e.stopPropagation()}
                              >
                                {linkText}
                              </Link>
                            </li>
                          );
                        })
                      : p.fallbacks.map((line) => <li key={line}>{line}</li>)}
                  </ul>
                  <a className="trinity-find-btn" href="#stores">
                    {tr.findInStore}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
