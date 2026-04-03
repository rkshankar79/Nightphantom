"use client";

import dynamic from "next/dynamic";
import config from "@/sanity.config";

/** Next.js 16 + React 19: SSR of NextStudio can hang or error; load only on client. */
const NextStudio = dynamic(
  () => import("next-sanity/studio").then((mod) => mod.NextStudio),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(232, 228, 216, 0.65)",
          fontFamily: "system-ui, sans-serif",
          fontSize: "0.9rem",
        }}
      >
        Loading Studio…
      </div>
    ),
  },
);

export default function StudioClient() {
  return <NextStudio config={config} />;
}
