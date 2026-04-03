import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "effect",
      title: "Effect (Trinity)",
      type: "string",
      options: {
        list: [
          { title: "Dawn (Sativa)", value: "dawn" },
          { title: "Twilight (Hybrid)", value: "twilight" },
          { title: "Dusk (Indica)", value: "dusk" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "format",
      title: "Format",
      type: "string",
      options: {
        list: [
          { title: "Flower", value: "flower" },
          { title: "Pre-roll", value: "preroll" },
          { title: "Vape", value: "vape" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "listingLabel",
      title: "Trinity list label",
      description: "Short line under the card, e.g. “Dawn flower”",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "body",
      title: "Full story",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "images",
      title: "Photos",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alt text",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "thcDisplay",
      title: "THC (display text)",
      type: "string",
      description: "e.g. “24%” — follow state labeling rules",
    }),
    defineField({
      name: "coaUrl",
      title: "COA / lab link",
      type: "url",
    }),
  ],
  preview: {
    select: {
      title: "title",
      effect: "effect",
      format: "format",
      media: "images.0",
    },
    prepare({ title, effect, format, media }) {
      return {
        title: title || "Untitled",
        subtitle: [effect, format].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
