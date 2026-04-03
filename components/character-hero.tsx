import Image from "next/image";

export function CharacterHero() {
  return (
    <section
      className="character-hero"
      id="hero"
      aria-labelledby="character-hero-heading"
    >
      <h1 id="character-hero-heading" className="character-hero-sr-title">
        Night Phantom — Untamed Spirit
      </h1>

      <div className="character-hero-media">
        <Image
          src="/np-hero-main.png"
          alt="Night Phantom — hooded hero leaping over a night city, teal glow, chest emblem, Night Phantom wordmark."
          fill
          priority
          sizes="100vw"
          className="character-hero-img"
          unoptimized
        />
      </div>
      <div className="character-hero-lift" aria-hidden />
      <div className="character-hero-scrim" aria-hidden />
      <div className="character-hero-gradient" aria-hidden />

      <div className="character-hero-sfx" aria-hidden>
        <div className="comic-sfx comic-sfx--baam">
          <span className="comic-sfx-star comic-sfx-star--red" />
          <span className="comic-sfx-label">Baam!</span>
        </div>
        <div className="comic-sfx comic-sfx--swoosh">
          <span className="comic-sfx-speed" />
          <span className="comic-sfx-label comic-sfx-label--swoosh">Swoosh!</span>
        </div>
        <div className="comic-sfx comic-sfx--kapow">
          <span className="comic-sfx-star comic-sfx-star--gold" />
          <span className="comic-sfx-label comic-sfx-label--kapow">Kapow!</span>
        </div>
        <div className="comic-sfx comic-sfx--pow">
          <span className="comic-sfx-burst-ring" />
          <span className="comic-sfx-label comic-sfx-label--pow">Pow!</span>
        </div>
      </div>

      <p className="character-hero-tagline">Untamed Spirit</p>

      <div className="hero-cta-bar">
        <a className="hero-cta-link" href="#trinity">
          Choose your power
        </a>
      </div>
    </section>
  );
}
