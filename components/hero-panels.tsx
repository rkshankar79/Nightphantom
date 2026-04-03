import Image from "next/image";

const panels = [
  {
    id: "twilight",
    href: "#trinity",
    image: "/ComicVapes1.png",
    alt: "Night Phantom Twilight Duo — Hybrid — Red & Black",
    panelClass: "panel-red",
    type: "Hybrid",
    name: "Twilight Duo",
    sub: "Red & Black · 1g Each",
    priority: true,
  },
  {
    id: "dusk",
    href: "#trinity",
    image: "/ComicVapes2.png",
    alt: "Night Phantom Dusk Duo — Indica — Purple & Blue",
    panelClass: "panel-yellow",
    type: "Indica",
    name: "Dusk Duo",
    sub: "Purple & Blue · 1g Each",
    priority: false,
  },
  {
    id: "dawn",
    href: "#trinity",
    image: "/ComicVapes3.png",
    alt: "Night Phantom Dawn Duo — Sativa — Yellow & Blue",
    panelClass: "panel-purple",
    type: "Sativa",
    name: "Dawn Duo",
    sub: "Yellow & Blue · 1g Each",
    priority: false,
  },
] as const;

export function HeroPanels() {
  return (
    <section className="hero" id="hero" aria-label="Featured duos">
      {panels.map((p) => (
        <a key={p.id} href={p.href} className={`hero-panel ${p.panelClass}`}>
          <Image
            className="panel-img"
            src={p.image}
            alt={p.alt}
            width={1200}
            height={1600}
            sizes="(max-width: 900px) 100vw, 33vw"
            priority={p.priority}
          />
          <div className="panel-label">
            <span className="panel-type">{p.type}</span>
            <div className="panel-name">{p.name}</div>
            <div className="panel-sub">{p.sub}</div>
          </div>
        </a>
      ))}
      <div className="hero-center">
        <div className="hero-tagline">Untamed Spirit</div>
      </div>
      <div className="hero-cta-bar">
        <a className="hero-cta-link" href="#trinity">
          Choose your power
        </a>
      </div>
    </section>
  );
}
