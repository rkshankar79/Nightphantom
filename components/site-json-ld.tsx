import { NP_INFO_EMAIL } from "@/lib/site-contact";
import { absoluteUrl, siteUrl } from "@/lib/site";

/**
 * Single JSON-LD document with @graph (not a top-level array).
 * Some consumers assume the root has @context and break on arrays.
 */
export function SiteJsonLd() {
  const base = siteUrl();
  const payload = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Night Phantom",
        legalName: "Indus365 Grow LLC",
        url: base,
        logo: absoluteUrl("/nplogo.png"),
        email: NP_INFO_EMAIL,
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+1-217-963-3013",
            contactType: "customer service",
            areaServed: "US",
            availableLanguage: ["English", "Spanish"],
          },
        ],
      },
      {
        "@type": "WebSite",
        name: "Night Phantom",
        url: base,
        description:
          "Comic-book inspired cannabis brand. Premium vapes and more. For adults 21+ in legal jurisdictions only.",
        publisher: {
          "@type": "Organization",
          name: "Night Phantom",
          url: base,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
