import Link from "next/link";
import type { Metadata } from "next";
import { PoweredBy } from "@/components/powered-by";
import { SiteNav } from "@/components/site-nav";
import { getLocale, getMessages } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getMessages(locale);
  return {
    title: t.privacy.metaTitle,
    description: t.privacy.metaDescription,
  };
}

export default async function PrivacyPage() {
  const locale = await getLocale();
  const t = getMessages(locale);

  return (
    <>
      <SiteNav />
      <main className="privacy-page" id="main-content">
        <div className="privacy-page-inner np-section">
          <Link className="privacy-back" href="/">
            {t.privacy.back}
          </Link>
          <h1 className="privacy-title">{t.privacy.title}</h1>
          <p className="privacy-updated">{t.privacy.updated}</p>

          <div className="privacy-body">
            {t.privacy.sections.map((section) => (
              <section key={section.heading} className="privacy-section">
                <h2 className="privacy-section-title">{section.heading}</h2>
                {section.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </section>
            ))}
          </div>
          <PoweredBy />
        </div>
      </main>
    </>
  );
}
