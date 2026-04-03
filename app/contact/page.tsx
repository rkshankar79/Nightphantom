import Link from "next/link";
import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";

export const metadata: Metadata = {
  title: "Contact — Night Phantom",
  description:
    "Contact Night Phantom / Indus365 Grow LLC in Harristown, Illinois. Phone 217-963-3013.",
};

export default function ContactPage() {
  return (
    <>
      <SiteNav />
      <main className="contact-page" id="main-content">
        <div className="contact-page-inner np-section">
          <Link className="contact-back" href="/">
            ← Home
          </Link>
          <p className="section-label">Contact</p>
          <h1 className="contact-title">Get in touch</h1>
          <p className="contact-lede">
            For wholesale questions, facility information, or general inquiries about Night
            Phantom, reach us using the details below. Cannabis products are sold through
            licensed Illinois dispensaries only — not from this site.
          </p>

          <div className="contact-card">
            <h2 className="contact-card-heading">Phone</h2>
            <p>
              <a className="contact-phone" href="tel:+12179633013">
                217-963-3013
              </a>
            </p>

            <h2 className="contact-card-heading">Facility</h2>
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
                Open map (Harristown, IL)
              </a>
            </p>
          </div>

          <p className="contact-disclaimer">
            For use only by adults 21 years of age and older. Keep out of reach of children.
            Cannabis may impair concentration, coordination, and judgment.
          </p>
        </div>
      </main>
    </>
  );
}
