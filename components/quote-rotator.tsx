"use client";

import { useCallback, useEffect, useId, useState } from "react";

const INTERVAL_MS = 6500;

type Props = {
  quotes: string[];
  attribution: string;
  carouselAria: string;
  dotsLabel: string;
};

export function QuoteRotator({
  quotes,
  attribution,
  carouselAria,
  dotsLabel,
}: Props) {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const regionId = useId();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion || quotes.length <= 1) return;
    const t = window.setInterval(
      () => setIndex((i) => (i + 1) % quotes.length),
      INTERVAL_MS,
    );
    return () => window.clearInterval(t);
  }, [quotes.length, reduceMotion]);

  const go = useCallback((i: number) => {
    setIndex(((i % quotes.length) + quotes.length) % quotes.length);
  }, [quotes.length]);

  if (quotes.length === 0) return null;

  return (
    <div
      className="np-quote-rotator"
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={regionId}
    >
      <p id={regionId} className="np-quote-carousel-sr-title">
        {carouselAria}
      </p>
      <div
        className="np-quote-rotator-viewport"
        aria-live={reduceMotion ? "polite" : "off"}
        aria-atomic="true"
      >
        <p key={index} className="np-quote-text np-quote-text--rotator">
          {quotes[index]}
        </p>
      </div>
      <p className="np-quote-attr">{attribution}</p>
      {quotes.length > 1 ? (
        <div className="np-quote-dots" role="tablist" aria-label={dotsLabel}>
          {quotes.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`${i + 1} / ${quotes.length}`}
              className={`np-quote-dot ${i === index ? "is-active" : ""}`}
              onClick={() => go(i)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
