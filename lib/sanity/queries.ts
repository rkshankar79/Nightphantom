import { defineQuery } from "next-sanity";

export const productsForTrinityQuery = defineQuery(`
  *[_type == "product" && defined(slug.current)] | order(effect asc, format asc) {
    _id,
    title,
    "slug": slug.current,
    effect,
    format,
    listingLabel,
    shortDescription
  }
`);

export const productBySlugQuery = defineQuery(`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    effect,
    format,
    listingLabel,
    shortDescription,
    body,
    thcDisplay,
    coaUrl,
    images[]{
      ...,
      asset->{ _id, url, metadata { dimensions } }
    }
  }
`);
