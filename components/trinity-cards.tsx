"use client";

import Link from "next/link";
import { useCallback, useId, useState } from "react";
import type { TrinityProductLine } from "@/lib/sanity/fetch";
import type { ProductsByEffect, TrinityPowerId } from "@/lib/sanity/types";

export type { TrinityPowerId as PowerId };

const POWERS: {
  id: TrinityPowerId;
  title: string;
  type: string;
  focus: string;
  theme: "trinity-dawn" | "trinity-twilight" | "trinity-dusk";
  fallbackLabels: readonly string[];
}[] = [
  {
    id: "dawn",
    title: "DAWN",
    type: "Sativa",
    focus: "Energy · Focus · Rising",
    theme: "trinity-dawn",
    fallbackLabels: ["Dawn flower", "Dawn pre-roll", "Dawn vape"],
  },
  {
    id: "twilight",
    title: "TWILIGHT",
    type: "Hybrid",
    focus: "Balance · Creativity · Flow",
    theme: "trinity-twilight",
    fallbackLabels: ["Twilight flower", "Twilight pre-roll", "Twilight vape"],
  },
  {
    id: "dusk",
    title: "DUSK",
    type: "Indica",
    focus: "Rest · Recovery · The night",
    theme: "trinity-dusk",
    fallbackLabels: ["Dusk flower", "Dusk pre-roll", "Dusk vape"],
  },
];

type Props = {
  productsByEffect: ProductsByEffect;
};

export function TrinityCards({ productsByEffect }: Props) {
  const [openId, setOpenId] = useState<TrinityPowerId | null>(null);
  const sectionLabelId = useId();

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
        <p className="section-label trinity-section-label" id={sectionLabelId}>
          Choose your power
        </p>
        <h2 className="trinity-headline">The Trinity</h2>
        <p className="trinity-lede">
          Three effects. Three ways in. Tap a card to see what we make under each
          spirit — then find it on shelves (never sold online).
        </p>

        <div className="trinity-grid" role="list">
          {POWERS.map((p) => {
            const expanded = openId === p.id;
            const cms = productsByEffect[p.id]?.filter(Boolean) ?? [];
            return (
              <div
                key={p.id}
                className={`trinity-card-wrap ${p.theme}`}
                role="listitem"
              >
                <button
                  type="button"
                  className={`trinity-card ${p.theme} ${expanded ? "is-open" : ""}`}
                  onClick={() => toggle(p.id)}
                  aria-expanded={expanded}
                  aria-controls={`trinity-panel-${p.id}`}
                  id={`trinity-trigger-${p.id}`}
                >
                  <span className="trinity-card-shimmer" aria-hidden />
                  <span className="trinity-card-type">{p.type}</span>
                  <span className="trinity-card-title">{p.title}</span>
                  <span className="trinity-card-focus">{p.focus}</span>
                  <span className="trinity-card-hint">
                    {expanded ? "Tap to collapse" : "Tap to reveal lineup"}
                  </span>
                </button>

                <div
                  id={`trinity-panel-${p.id}`}
                  role="region"
                  aria-labelledby={`trinity-trigger-${p.id}`}
                  aria-hidden={!expanded}
                  className={`trinity-panel ${expanded ? "is-open" : ""}`}
                >
                  <ul className="trinity-sku-list">
                    {cms.length > 0
                      ? cms.map((item) => (
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
                      : p.fallbackLabels.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                  </ul>
                  <a className="trinity-find-btn" href="#stores">
                    Find in store
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
