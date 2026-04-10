import type { PortableTextBlock } from "next-sanity";
import type { Locale } from "@/lib/i18n/types";
import type { ProductDetail, TrinityProductLine } from "@/lib/sanity/fetch";

/** Product title: Spanish override when locale is es and field is set. */
export function pickProductTitle(
  p: Pick<TrinityProductLine, "title" | "titleEs">,
  locale: Locale,
): string {
  if (locale === "es" && p.titleEs?.trim()) return p.titleEs.trim();
  return p.title;
}

/** Trinity list / card line: Spanish override when set. */
export function pickListingLabel(
  p: Pick<TrinityProductLine, "listingLabel" | "listingLabelEs">,
  locale: Locale,
): string {
  if (locale === "es" && p.listingLabelEs?.trim()) return p.listingLabelEs.trim();
  return p.listingLabel;
}

export function pickShortDescription(
  p: Pick<ProductDetail, "shortDescription" | "shortDescriptionEs">,
  locale: Locale,
): string | undefined {
  if (locale === "es" && p.shortDescriptionEs?.trim()) {
    return p.shortDescriptionEs.trim();
  }
  return p.shortDescription?.trim() || undefined;
}

/** Rich text: use Spanish body when locale is es and blocks exist. */
export function pickProductBody(
  p: ProductDetail,
  locale: Locale,
): PortableTextBlock[] | undefined {
  if (locale === "es" && p.bodyEs && p.bodyEs.length > 0) {
    return p.bodyEs;
  }
  if (p.body && p.body.length > 0) return p.body;
  return undefined;
}
