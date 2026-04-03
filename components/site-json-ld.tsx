import { NP_INFO_EMAIL } from "@/lib/site-contact";
import { absoluteUrl, siteUrl } from "@/lib/site";

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Night Phantom",
  legalName: "Indus365 Grow LLC",
  url: siteUrl(),
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
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Night Phantom",
  url: siteUrl(),
  description:
    "Comic-book inspired cannabis brand. Premium vapes and more. For adults 21+ in legal jurisdictions only.",
  publisher: { "@type": "Organization", name: "Night Phantom", url: siteUrl() },
};

export function SiteJsonLd() {
  const payload = [orgSchema, websiteSchema];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
