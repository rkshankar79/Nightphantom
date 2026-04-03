import Image from "next/image";

type Props = {
  srTitle: string;
  imageAlt: string;
  tagline: string;
  cta: string;
};

export function CharacterHero({ srTitle, imageAlt, tagline, cta }: Props) {
  return (
    <section
      className="character-hero"
      id="hero"
      aria-labelledby="character-hero-heading"
    >
      <h1 id="character-hero-heading" className="character-hero-sr-title">
        {srTitle}
      </h1>

      <div className="character-hero-media">
        <Image
          src="/np-hero-main.png"
          alt={imageAlt}
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

      <p className="character-hero-tagline">{tagline}</p>

      <div className="hero-cta-bar">
        <a className="hero-cta-link" href="#trinity">
          {cta}
        </a>
      </div>
    </section>
  );
}
