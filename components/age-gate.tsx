"use client";

import { useLayoutEffect, useState } from "react";

const STORAGE_KEY = "np_age_verified";

export function AgeGate() {
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
      <h3 id="age-gate-title">Are you 21 or older?</h3>
      <p>You must be of legal cannabis age to enter. Please verify your age.</p>
      <div className="age-btns">
        <button type="button" className="btn-primary" onClick={enter}>
          Yes, I&apos;m 21+
        </button>
        <button
          type="button"
          className="age-no"
          onClick={() => {
            window.location.href = "https://www.google.com";
          }}
        >
          No
        </button>
      </div>
      <p style={{ fontSize: "0.7rem", color: "var(--np-text-dim)" }}>
        For legal jurisdictions only. Keep out of reach of children.
      </p>
    </div>
  );
}
