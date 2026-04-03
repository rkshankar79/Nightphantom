import type { TrinityPowerId } from "@/lib/sanity/types";

export type Locale = "en" | "es";

export type Messages = {
  nav: {
    ariaPrimary: string;
    ariaHome: string;
    trinity: string;
    vapeTech: string;
    story: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
    mobileNav: string;
    tagline: string;
    langEnglish: string;
    langSpanish: string;
    langSwitchTo: string;
  };
  ageGate: {
    title: string;
    body: string;
    yes: string;
    no: string;
    footnote: string;
  };
  skip: string;
  hero: {
    srTitle: string;
    imageAlt: string;
    tagline: string;
    cta: string;
  };
  trinity: {
    sectionLabel: string;
    headline: string;
    lede: string;
    tapCollapse: string;
    tapReveal: string;
    findInStore: string;
    /** "{count}" = number of SKUs when one link groups several products */
    skuGroupCount: string;
    powers: Record<
      TrinityPowerId,
      { type: string; title: string; focus: string; fallbacks: string[] }
    >;
  };
  home: {
    quote: string;
    quoteAttr: string;
    storyLabel: string;
    storyTitle: string;
    storyBody: string;
    ctaTitle: string;
    ctaCopy: string;
    contactUs: string;
    footerRights: string;
    footerDisclaimer: string;
    privacyLink: string;
  };
  contact: {
    metaTitle: string;
    metaDescription: string;
    back: string;
    label: string;
    title: string;
    lede: string;
    phoneHeading: string;
    facilityHeading: string;
    mapLink: string;
    disclaimer: string;
  };
  product: {
    back: string;
    thcPrefix: string;
    vapeTechLink: string;
    coaLink: string;
    disclaimer: string;
    formatFlower: string;
    formatPreroll: string;
    formatVape: string;
  };
  productLine: {
    back: string;
    chooseIntro: string;
  };
  privacy: {
    metaTitle: string;
    metaDescription: string;
    back: string;
    title: string;
    updated: string;
    sections: { heading: string; paragraphs: string[] }[];
  };
  site: {
    poweredByLead: string;
    poweredByName: string;
  };
};
