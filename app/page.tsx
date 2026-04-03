import Image from "next/image";
import { AgeGate } from "@/components/age-gate";
import { CharacterHero } from "@/components/character-hero";
import { SiteNav } from "@/components/site-nav";
import { TrinityCards } from "@/components/trinity-cards";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <AgeGate />
      <SiteNav />

      <main id="main-content" tabIndex={-1}>
        <CharacterHero />

        <TrinityCards />

        <div className="np-quote-strip">
          <div className="np-quote-panel">
            <p className="np-quote-text">
              The shadows don&apos;t hide me, they answer to me.
            </p>
            <p className="np-quote-attr">— Night Phantom · Untamed Spirit</p>
          </div>
        </div>

        <section className="np-section" id="story" style={{ background: "var(--np-ink)" }}>
          <p className="section-label">Universe</p>
          <h2>Story</h2>
          <p>
            Night Phantom is more than a brand — it&apos;s a universe. Born from the shadows
            and inspired by iconic characters of strength and valor, we stand for purity,
            power, and fearless creativity.
          </p>
        </section>

        <section className="cta-section" id="stores" aria-labelledby="cta-heading">
          <Image
            className="cta-logo"
            src="/nplogo.png"
            alt="Night Phantom"
            width={280}
            height={140}
          />
          <h2 id="cta-heading">Find us in Illinois</h2>
          <p className="cta-copy">
            Licensed dispensaries only. We don&apos;t sell online — ask your budtender for
            Night Phantom.
          </p>
          <a
            className="btn-ghost"
            href="https://nightphantomhq.com/shop/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit shop site
          </a>
        </section>

        <footer className="np-footer">
          <p>© {new Date().getFullYear()} Night Phantom. All rights reserved.</p>
          <p className="footer-disclaimer">
            For use only by adults 21 years of age and older. Keep out of reach of children.
            Cannabis may impair concentration, coordination, and judgment.
          </p>
        </footer>
      </main>
    </>
  );
}
