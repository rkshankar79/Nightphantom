import type { MetadataRoute } from "next";
import { getTrinityProducts } from "@/lib/sanity/fetch";
import { siteUrl } from "@/lib/site";

const EFFECTS = new Set(["dawn", "twilight", "dusk"]);
const FORMATS = new Set(["flower", "preroll", "vape"]);

/** Regenerate periodically so new Sanity products appear in the sitemap */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${base}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${base}/compliance`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.55,
    },
    {
      url: `${base}/vape-tech`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const products = await getTrinityProducts();
  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const lineKeys = new Set<string>();
  for (const p of products) {
    if (EFFECTS.has(p.effect) && FORMATS.has(p.format)) {
      lineKeys.add(`${p.effect}/${p.format}`);
    }
  }
  const lineEntries: MetadataRoute.Sitemap = [...lineKeys].map((key) => ({
    url: `${base}/products/line/${key}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...staticRoutes, ...productEntries, ...lineEntries];
}
