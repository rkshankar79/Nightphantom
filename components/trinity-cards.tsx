"use client";

import Link from "next/link";
import { useCallback, useId, useState } from "react";
import { useLocale } from "@/components/locale-context";
import type { TrinityProductLine } from "@/lib/sanity/fetch";
import type { ProductsByEffect, TrinityPowerId } from "@/lib/sanity/types";

export type { TrinityPowerId as PowerId };

const POWER_ORDER: TrinityPowerId[] = ["dawn", "twilight", "dusk"];

type Props = {
  productsByEffect: ProductsByEffect;
};

export function TrinityCards({ productsByEffect }: Props) {
  const { messages: t } = useLocale();
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
            const cms = productsByEffect[id]?.filter(Boolean) ?? [];
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
                    {cms.length > 0
                      ? cms.map((item: TrinityProductLine) => (
                          <li key={item._id}>
                            <Link
                              href={`/products/${item.slug}`}
                              className="trinity-product-link"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {item.listingLabel}
                            </Link>
                          </li>
                        ))
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
