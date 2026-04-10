import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { publicComplianceImagePath } from "@/lib/compliance-images";
import { getLocale, getMessages } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getMessages(locale);
  const c = t.compliance;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: "/compliance" },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      type: "website",
      url: "/compliance",
    },
  };
}

export default async function CompliancePage() {
  const locale = await getLocale();
  const t = getMessages(locale);
  const c = t.compliance;
  const h = t.home;

  const sections = [
    {
      id: "vape" as const,
      heading: c.vapeHeading,
      en: c.vapeEn,
      es: c.vapeEs,
    },
    {
      id: "flower" as const,
      heading: c.flowerHeading,
      en: c.flowerEn,
      es: c.flowerEs,
    },
    {
      id: "preroll" as const,
      heading: c.prerollHeading,
      en: c.prerollEn,
      es: c.prerollEs,
    },
  ];

  const qrRows = [
    { id: "vape" as const, shortLabel: c.vapeShort },
    { id: "flower" as const, shortLabel: c.flowerShort },
    { id: "preroll" as const, shortLabel: c.prerollShort },
  ];

  const imageAlt = {
    vape: c.vapeImageAlt,
    flower: c.flowerImageAlt,
    preroll: c.prerollImageAlt,
  } as const;
  const imageCaption = {
    vape: c.vapeImageCaption,
    flower: c.flowerImageCaption,
    preroll: c.prerollImageCaption,
  } as const;

  const imageSrcById = {
    vape: publicComplianceImagePath("vape"),
    flower: publicComplianceImagePath("flower"),
    preroll: publicComplianceImagePath("preroll"),
  } as const;

  return (
    <>
      <SiteNav />
      <main className="compliance-page" id="main-content">
        <div className="compliance-inner np-section">
          <Link className="compliance-back" href="/">
            {c.back}
          </Link>
          <p className="section-label">{c.label}</p>
          <h1 className="compliance-title">{c.title}</h1>
          <p className="compliance-intro">{c.intro}</p>

          <aside className="compliance-qr-panel" aria-labelledby="compliance-qr-heading">
            <h2 id="compliance-qr-heading" className="compliance-qr-heading">
              {c.qrHeading}
            </h2>
            <p className="compliance-qr-lede">{c.qrLede}</p>
            <ul className="compliance-qr-list">
              {qrRows.map((row) => (
                <li key={row.id}>
                  <span className="compliance-qr-format">{row.shortLabel}</span>
                  <code className="compliance-qr-url" tabIndex={0}>
                    {absoluteUrl(`/compliance#${row.id}`)}
                  </code>
                </li>
              ))}
            </ul>
          </aside>

          {sections.map((sec) => {
            const imgSrc = imageSrcById[sec.id];
            return (
              <section
                key={sec.id}
                id={sec.id}
                className="compliance-section"
                aria-labelledby={`compliance-${sec.id}-h2`}
                tabIndex={-1}
              >
                <h2 id={`compliance-${sec.id}-h2`} className="compliance-section-title">
                  {sec.heading}
                </h2>

                <div className="compliance-lang">
                  <h3 className="compliance-lang-label">{c.enLabel}</h3>
                  <div className="compliance-prose">{sec.en}</div>
                </div>

                <div className="compliance-lang">
                  <h3 className="compliance-lang-label">{c.esLabel}</h3>
                  <div className="compliance-prose">{sec.es}</div>
                </div>

                <figure className="compliance-figure">
                  {imgSrc ? (
                    <div className="compliance-image-frame">
                      <Image
                        src={imgSrc}
                        alt={imageAlt[sec.id]}
                        width={1200}
                        height={900}
                        className="compliance-doc-img"
                        sizes="(max-width: 900px) 100vw, 46rem"
                      />
                    </div>
                  ) : (
                    <div
                      className="compliance-image-placeholder"
                      role="img"
                      aria-label={imageAlt[sec.id]}
                    />
                  )}
                  <figcaption className="compliance-figcaption">
                    {imageCaption[sec.id]}
                  </figcaption>
                </figure>
              </section>
            );
          })}
        </div>

        <SiteFooter home={h} />
      </main>
    </>
  );
}
