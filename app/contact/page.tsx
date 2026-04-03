import Link from "next/link";
import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { getLocale, getMessages } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getMessages(locale);
  return {
    title: t.contact.metaTitle,
    description: t.contact.metaDescription,
  };
}

export default async function ContactPage() {
  const locale = await getLocale();
  const t = getMessages(locale);
  const c = t.contact;

  return (
    <>
      <SiteNav />
      <main className="contact-page" id="main-content">
        <div className="contact-page-inner np-section">
          <Link className="contact-back" href="/">
            {c.back}
          </Link>
          <p className="section-label">{c.label}</p>
          <h1 className="contact-title">{c.title}</h1>
          <p className="contact-lede">{c.lede}</p>

          <div className="contact-card">
            <h2 className="contact-card-heading">{c.phoneHeading}</h2>
            <p>
              <a className="contact-phone" href="tel:+12179633013">
                217-963-3013
              </a>
            </p>

            <h2 className="contact-card-heading">{c.facilityHeading}</h2>
            <address className="contact-address">
              Indus365 Grow LLC
              <br />
              Harristown, IL
            </address>
            <p className="contact-maps">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Harristown%2C+IL"
                target="_blank"
                rel="noopener noreferrer"
              >
                {c.mapLink}
              </a>
            </p>
          </div>

          <p className="contact-disclaimer">{c.disclaimer}</p>

          <p className="contact-privacy-wrap">
            <Link className="footer-privacy-link" href="/privacy">
              {t.home.privacyLink}
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
