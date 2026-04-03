import { getSanityClient } from "@/lib/sanity/client";
import { productBySlugQuery, productsForTrinityQuery } from "@/lib/sanity/queries";

export type TrinityProductLine = {
  _id: string;
  title: string;
  slug: string;
  effect: string;
  format: string;
  listingLabel: string;
  shortDescription?: string;
};

export async function getTrinityProducts(): Promise<TrinityProductLine[]> {
  const client = getSanityClient();
  if (!client) return [];
  return client.fetch(productsForTrinityQuery);
}

export type ProductDetail = {
  _id: string;
  title: string;
  slug: string;
  effect: string;
  format: string;
  listingLabel: string;
  shortDescription?: string;
  body?: unknown;
  thcDisplay?: string;
  coaUrl?: string;
  images?: Array<{
    _key?: string;
    alt?: string;
    asset?: { _id: string; url: string; metadata?: { dimensions?: { width: number; height: number } } };
  }>;
};

export async function getProductBySlug(
  slug: string,
): Promise<ProductDetail | null> {
  const client = getSanityClient();
  if (!client) return null;
  return client.fetch(productBySlugQuery, { slug });
}
