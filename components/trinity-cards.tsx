"use client";

import { useCallback, useId, useState } from "react";

type PowerId = "dawn" | "twilight" | "dusk";

const POWERS: {
  id: PowerId;
  title: string;
  type: string;
  focus: string;
  theme: "trinity-dawn" | "trinity-twilight" | "trinity-dusk";
  formats: readonly string[];
}[] = [
  {
    id: "dawn",
    title: "DAWN",
    type: "Sativa",
    focus: "Energy · Focus · Rising",
    theme: "trinity-dawn",
    formats: ["Dawn flower", "Dawn pre-roll", "Dawn vape"],
  },
  {
    id: "twilight",
    title: "TWILIGHT",
    type: "Hybrid",
    focus: "Balance · Creativity · Flow",
    theme: "trinity-twilight",
    formats: ["Twilight flower", "Twilight pre-roll", "Twilight vape"],
  },
  {
    id: "dusk",
    title: "DUSK",
    type: "Indica",
    focus: "Rest · Recovery · The night",
    theme: "trinity-dusk",
    formats: ["Dusk flower", "Dusk pre-roll", "Dusk vape"],
  },
];

export function TrinityCards() {
  const [openId, setOpenId] = useState<PowerId | null>(null);
  const sectionLabelId = useId();

  const toggle = useCallback((id: PowerId) => {
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
                    {p.formats.map((line) => (
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
