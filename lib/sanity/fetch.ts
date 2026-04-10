import type { PortableTextBlock } from "next-sanity";
import { getSanityClient } from "@/lib/sanity/client";
import {
  productBySlugQuery,
  productsByLineQuery,
  productsForTrinityQuery,
} from "@/lib/sanity/queries";

export type TrinityProductLine = {
  _id: string;
  title: string;
  /** Optional Spanish title; used when site language is ES */
  titleEs?: string;
  slug: string;
  effect: string;
  format: string;
  listingLabel: string;
  /** Optional Spanish label for Trinity list links */
  listingLabelEs?: string;
  shortDescription?: string;
};

export async function getTrinityProducts(): Promise<TrinityProductLine[]> {
  const client = getSanityClient();
  if (!client) return [];
  try {
    return await client.fetch(productsForTrinityQuery, {}, { timeout: 12_000 });
  } catch (err) {
    console.error("[sanity] getTrinityProducts failed:", err);
    return [];
  }
}

export type ProductDetail = {
  _id: string;
  title: string;
  titleEs?: string;
  slug: string;
  effect: string;
  format: string;
  listingLabel: string;
  listingLabelEs?: string;
  shortDescription?: string;
  shortDescriptionEs?: string;
  body?: PortableTextBlock[];
  /** Spanish portable text; used when site language is ES */
  bodyEs?: PortableTextBlock[];
  thcDisplay?: string;
  coaUrl?: string;
  images?: Array<{
    _key?: string;
    alt?: string;
    asset?: { _id: string; url: string; metadata?: { dimensions?: { width: number; height: number } } };
  }>;
};

export async function getProductsByLine(
  effect: string,
  format: string,
): Promise<TrinityProductLine[]> {
  const client = getSanityClient();
  if (!client) return [];
  try {
    return await client.fetch(productsByLineQuery, { effect, format }, { timeout: 12_000 });
  } catch (err) {
    console.error("[sanity] getProductsByLine failed:", err);
    return [];
  }
}

export async function getProductBySlug(
  slug: string,
): Promise<ProductDetail | null> {
  const client = getSanityClient();
  if (!client) return null;
  try {
    return await client.fetch(productBySlugQuery, { slug }, { timeout: 12_000 });
  } catch (err) {
    console.error("[sanity] getProductBySlug failed:", err);
    return null;
  }
}
