import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { AgeGate } from "@/components/age-gate";
import { CharacterHero } from "@/components/character-hero";
import { SiteNav } from "@/components/site-nav";
import { TrinityCards } from "@/components/trinity-cards";
import { getTrinityProducts } from "@/lib/sanity/fetch";
import {
  groupProductsByEffect,
  rowsByEffectForTrinity,
} from "@/lib/sanity/group-products";
import { PoweredBy } from "@/components/powered-by";
import { QuoteRotator } from "@/components/quote-rotator";
import { getLocale, getMessages } from "@/lib/i18n";
import { NP_INFO_EMAIL, NP_INFO_MAILTO } from "@/lib/site-contact";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Home() {
  const locale = await getLocale();
  const t = getMessages(locale);
  const h = t.home;
  const trinityProducts = await getTrinityProducts();
  const productsByEffect = groupProductsByEffect(trinityProducts);
  const skuRowsByEffect = rowsByEffectForTrinity(productsByEffect);

  return (
    <>
      <a className="skip-link" href="#main-content">
        {t.skip}
      </a>
      <AgeGate />
      <SiteNav />

      <main id="main-content" tabIndex={-1}>
        <CharacterHero
          srTitle={t.hero.srTitle}
          imageAlt={t.hero.imageAlt}
          tagline={t.hero.tagline}
          cta={t.hero.cta}
        />

        <TrinityCards skuRowsByEffect={skuRowsByEffect} />

        <div className="np-quote-strip">
          <div className="np-quote-panel">
            <QuoteRotator
              quotes={h.rotatingQuotes}
              attribution={h.quoteAttr}
              carouselAria={h.quoteCarouselAria}
              dotsLabel={h.quoteDotsLabel}
            />
          </div>
        </div>

        <section className="np-section" id="story" style={{ background: "var(--np-ink)" }}>
          <p className="section-label">{h.storyLabel}</p>
          <h2>{h.storyTitle}</h2>
          <p>{h.storyBody}</p>
        </section>

        <section className="cta-section" id="stores" aria-labelledby="cta-heading">
          <Image
            className="cta-logo"
            src="/nplogo.png"
            alt="Night Phantom"
            width={280}
            height={140}
          />
          <h2 id="cta-heading">{h.ctaTitle}</h2>
          <p className="cta-copy">{h.ctaCopy}</p>
          <ul className="cta-locations" aria-label={h.ctaTitle}>
            {h.ctaLocations.map((city) => (
              <li key={city}>{city}</li>
            ))}
          </ul>
          <p className="cta-locations-more">{h.ctaLocationsMore}</p>
          <div className="cta-contact-block">
            <p className="cta-phone-wrap">
              <a className="cta-phone" href="tel:+12179633013">
                217-963-3013
              </a>
            </p>
            <p className="cta-facility">
              <span className="cta-facility-name">Indus365 Grow LLC</span>
              <br />
              Harristown, IL
            </p>
            <p className="cta-email-block">
              <span className="cta-email-intro">{h.ctaEmailIntro}</span>
              <a className="cta-email" href={NP_INFO_MAILTO}>
                {NP_INFO_EMAIL}
              </a>
            </p>
          </div>
          <Link className="btn-ghost" href="/contact">
            {h.contactUs}
          </Link>
        </section>

        <footer className="np-footer">
          <div className="np-footer-left">
            <p>
              © {new Date().getFullYear()} {h.footerRights}
            </p>
            <Link className="footer-privacy-link" href="/privacy">
              {h.privacyLink}
            </Link>
          </div>
          <p className="footer-disclaimer">{h.footerDisclaimer}</p>
          <PoweredBy />
        </footer>
      </main>
    </>
  );
}
