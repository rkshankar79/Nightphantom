import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { publicComplianceImages } from "@/lib/compliance-images";
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
    { id: "vape" as const, heading: c.vapeHeading },
    { id: "flower" as const, heading: c.flowerHeading },
    { id: "preroll" as const, heading: c.prerollHeading },
  ];

  const qrRows = [
    { id: "vape" as const, shortLabel: c.vapeShort },
    { id: "flower" as const, shortLabel: c.flowerShort },
    { id: "preroll" as const, shortLabel: c.prerollShort },
  ];

  const imageSrcsById = {
    vape: publicComplianceImages("vape"),
    flower: publicComplianceImages("flower"),
    preroll: publicComplianceImages("preroll"),
  } as const;

  function altForComplianceImage(
    secId: (typeof sections)[number]["id"],
    src: string,
  ): string {
    if (secId === "flower") {
      return src.includes("flower1") ? c.flowerImageAlt1 : c.flowerImageAlt;
    }
    return secId === "vape" ? c.vapeImageAlt : c.prerollImageAlt;
  }

  function placeholderAria(secId: (typeof sections)[number]["id"]): string {
    if (secId === "flower") return c.flowerImageAlt1;
    return secId === "vape" ? c.vapeImageAlt : c.prerollImageAlt;
  }

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

          {sections.map((sec) => {
            const imgSrcs = imageSrcsById[sec.id];
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

                <div className="compliance-figure">
                  {imgSrcs.length > 0 ? (
                    imgSrcs.map((src, i) => (
                      <div
                        key={`${sec.id}-${i}`}
                        className={
                          i > 0 ? "compliance-image-frame compliance-image-frame--stacked" : "compliance-image-frame"
                        }
                      >
                        <Image
                          src={src}
                          alt={altForComplianceImage(sec.id, src)}
                          width={1200}
                          height={900}
                          className="compliance-doc-img"
                          sizes="(max-width: 900px) 100vw, 46rem"
                        />
                      </div>
                    ))
                  ) : (
                    <div
                      className="compliance-image-placeholder"
                      role="img"
                      aria-label={placeholderAria(sec.id)}
                    />
                  )}
                </div>
              </section>
            );
          })}

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
        </div>

        <SiteFooter home={h} />
      </main>
    </>
  );
}
