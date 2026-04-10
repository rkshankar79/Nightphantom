import { defineQuery } from "next-sanity";

export const productsForTrinityQuery = defineQuery(`
  *[_type == "product" && defined(slug.current)] | order(effect asc, format asc) {
    _id,
    title,
    titleEs,
    "slug": slug.current,
    effect,
    format,
    listingLabel,
    listingLabelEs,
    shortDescription
  }
`);

export const productsByLineQuery = defineQuery(`
  *[_type == "product" && effect == $effect && format == $format && defined(slug.current)] | order(title asc) {
    _id,
    title,
    titleEs,
    "slug": slug.current,
    effect,
    format,
    listingLabel,
    listingLabelEs,
    shortDescription
  }
`);

export const productBySlugQuery = defineQuery(`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    titleEs,
    "slug": slug.current,
    effect,
    format,
    listingLabel,
    listingLabelEs,
    shortDescription,
    shortDescriptionEs,
    body,
    bodyEs,
    thcDisplay,
    coaUrl,
    images[]{
      ...,
      asset->{ _id, url, metadata { dimensions } }
    }
  }
`);
