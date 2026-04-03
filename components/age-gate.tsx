"use client";

import { useLayoutEffect, useState } from "react";
import { useLocale } from "@/components/locale-context";

const STORAGE_KEY = "np_age_verified";

export function AgeGate() {
  const { messages: t } = useLocale();
  const [show, setShow] = useState(true);

  useLayoutEffect(() => {
    try {
      if (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "1") {
        setShow(false);
      }
    } catch {
      /* private mode */
    }
  }, []);

  const enter = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="age-gate" role="dialog" aria-modal="true" aria-labelledby="age-gate-title">
      <h3 id="age-gate-title">{t.ageGate.title}</h3>
      <p>{t.ageGate.body}</p>
      <div className="age-btns">
        <button type="button" className="btn-primary" onClick={enter}>
          {t.ageGate.yes}
        </button>
        <button
          type="button"
          className="age-no"
          onClick={() => {
            window.location.href = "https://www.google.com";
          }}
        >
          {t.ageGate.no}
        </button>
      </div>
      <p style={{ fontSize: "0.7rem", color: "var(--np-text-dim)" }}>{t.ageGate.footnote}</p>
    </div>
  );
}
