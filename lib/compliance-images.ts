import { existsSync } from "node:fs";
import { join } from "node:path";

export type ComplianceSectionId = "vape" | "flower" | "preroll";

const ORDER = [".jpg", ".jpeg", ".png", ".webp"] as const;

/**
 * Resolves a public URL for `public/compliance/{id}.{ext}` when that file exists
 * (first match wins). Returns null if no file — show a placeholder in the UI.
 */
export function publicComplianceImagePath(id: ComplianceSectionId): string | null {
  const dir = join(process.cwd(), "public", "compliance");
  for (const ext of ORDER) {
    const file = join(dir, `${id}${ext}`);
    if (existsSync(file)) return `/compliance/${id}${ext}`;
  }
  return null;
}
