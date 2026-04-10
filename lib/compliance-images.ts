import { existsSync } from "node:fs";
import { join } from "node:path";

export type ComplianceSectionId = "vape" | "flower" | "preroll";

const ORDER = [".jpg", ".jpeg", ".png", ".webp"] as const;

const dir = () => join(process.cwd(), "public", "compliance");

/** First matching extension for `public/compliance/{baseName}.{ext}`. */
export function publicComplianceImageByBaseName(baseName: string): string | null {
  for (const ext of ORDER) {
    const file = join(dir(), `${baseName}${ext}`);
    if (existsSync(file)) return `/compliance/${baseName}${ext}`;
  }
  return null;
}

/**
 * One or more image URLs for a section. Flower uses two slots in order:
 * `flower1` then `flower` when those files exist.
 */
export function publicComplianceImages(id: ComplianceSectionId): string[] {
  if (id === "flower") {
    const out: string[] = [];
    const first = publicComplianceImageByBaseName("flower1");
    const second = publicComplianceImageByBaseName("flower");
    if (first) out.push(first);
    if (second) out.push(second);
    return out;
  }
  const one = publicComplianceImageByBaseName(id);
  return one ? [one] : [];
}

