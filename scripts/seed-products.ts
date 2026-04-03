/**
 * Loads products from data/products.seed.json into Sanity.
 * Requires SANITY_API_WRITE_TOKEN (Editor or Admin) in .env.local or the environment.
 *
 * Run from repo root: npm run seed:products
 * Re-runs are safe: documents use stable _id seed.product.{slug}.
 */

import { createClient } from "@sanity/client";
import { config } from "dotenv";
import { readFileSync } from "node:fs";
import { join } from "node:path";

config({ path: join(process.cwd(), ".env.local") });
config({ path: join(process.cwd(), ".env") });

const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const token = process.env.SANITY_API_WRITE_TOKEN || "";

const EFFECTS = new Set(["dawn", "twilight", "dusk"]);
const FORMATS = new Set(["flower", "preroll", "vape"]);

type SeedRow = {
  title: string;
  slug: string;
  effect: string;
  format: string;
  listingLabel: string;
  shortDescription?: string;
  thcDisplay?: string;
  coaUrl?: string;
};

function loadSeed(): SeedRow[] {
  const path = join(process.cwd(), "data", "products.seed.json");
  const raw = readFileSync(path, "utf8");
  const data = JSON.parse(raw) as unknown;
  if (!Array.isArray(data)) {
    throw new Error("products.seed.json must be a JSON array");
  }
  return data as SeedRow[];
}

function validateRow(row: SeedRow, index: number): void {
  const prefix = `Row ${index + 1}`;
  if (!row.title?.trim()) throw new Error(`${prefix}: missing title`);
  if (!row.slug?.trim()) throw new Error(`${prefix}: missing slug`);
  if (!EFFECTS.has(row.effect)) {
    throw new Error(`${prefix}: effect must be dawn | twilight | dusk`);
  }
  if (!FORMATS.has(row.format)) {
    throw new Error(`${prefix}: format must be flower | preroll | vape`);
  }
  if (!row.listingLabel?.trim()) {
    throw new Error(`${prefix}: missing listingLabel`);
  }
}

async function main() {
  if (!projectId) {
    console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
    process.exit(1);
  }
  if (!token) {
    console.error(
      "Set SANITY_API_WRITE_TOKEN in .env.local (Sanity → API → Tokens)",
    );
    process.exit(1);
  }

  const rows = loadSeed();
  rows.forEach(validateRow);

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });

  let tx = client.transaction();
  let n = 0;
  for (const row of rows) {
    const _id = `seed.product.${row.slug}`;
    tx = tx.createOrReplace({
      _id,
      _type: "product",
      title: row.title.trim(),
      slug: { _type: "slug", current: row.slug.trim() },
      effect: row.effect,
      format: row.format,
      listingLabel: row.listingLabel.trim(),
      ...(row.shortDescription?.trim()
        ? { shortDescription: row.shortDescription.trim() }
        : {}),
      ...(row.thcDisplay?.trim() ? { thcDisplay: row.thcDisplay.trim() } : {}),
      ...(row.coaUrl?.trim() ? { coaUrl: row.coaUrl.trim() } : {}),
    });
    n += 1;
  }

  await tx.commit();
  console.log(`Committed ${n} product document(s) to dataset "${dataset}".`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
