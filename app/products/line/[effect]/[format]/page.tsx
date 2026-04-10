import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PoweredBy } from "@/components/powered-by";
import { SiteNav } from "@/components/site-nav";
import { getLocale, getMessages } from "@/lib/i18n";
import { pickProductTitle } from "@/lib/i18n/product-copy";
import { getProductsByLine, getTrinityProducts } from "@/lib/sanity/fetch";
import type { TrinityPowerId } from "@/lib/sanity/types";

const EFFECTS = new Set<string>(["dawn", "twilight", "dusk"]);
const FORMATS = new Set<string>(["flower", "preroll", "vape"]);

type Props = { params: Promise<{ effect: string; format: string }> };

function formatWord(
  format: string,
  p: ReturnType<typeof getMessages>["product"],
): string {
  if (format === "flower") return p.formatFlower;
  if (format === "preroll") return p.formatPreroll;
  return p.formatVape;
}

export async function generateStaticParams() {
  const items = await getTrinityProducts();
  const counts = new Map<string, number>();
  for (const item of items) {
    if (!EFFECTS.has(item.effect) || !FORMATS.has(item.format)) continue;
    const key = `${item.effect}:${item.format}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return [...counts.entries()]
    .filter(([, n]) => n > 1)
    .map(([key]) => {
      const [effect, format] = key.split(":");
      return { effect, format };
    });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { effect, format } = await params;
  const locale = await getLocale();
  const ui = getMessages(locale);
  if (!EFFECTS.has(effect) || !FORMATS.has(format)) {
    return { title: locale === "es" ? "Productos" : "Products" };
  }
  const power = ui.trinity.powers[effect as TrinityPowerId];
  const fmt = formatWord(format, ui.product);
  const line = `${power.title} ${fmt}`.replace(/\s+/g, " ").trim();
  const path = `/products/line/${effect}/${format}`;
  return {
    title: `${line} — Night Phantom`,
    description: ui.productLine.chooseIntro,
    alternates: { canonical: path },
    openGraph: {
      title: `${line} — Night Phantom`,
      description: ui.productLine.chooseIntro,
      type: "website",
      url: path,
    },
  };
}

export default async function ProductLinePage({ params }: Props) {
  const { effect, format } = await params;
  if (!EFFECTS.has(effect) || !FORMATS.has(format)) notFound();

  const products = await getProductsByLine(effect, format);
  if (products.length === 0) notFound();

  const locale = await getLocale();
  const ui = getMessages(locale);
  const power = ui.trinity.powers[effect as TrinityPowerId];
  const fmt = formatWord(format, ui.product);
  const heading = `${power.title} ${fmt}`.toUpperCase();

  return (
    <>
      <SiteNav />
      <main className="product-page" id="main-content">
        <div className="product-page-inner np-section">
          <Link className="product-back" href="/#trinity">
            {ui.productLine.back}
          </Link>
          <p className="section-label">{power.type}</p>
          <h1 className="product-title">{heading}</h1>
          <p className="product-lede">{ui.productLine.chooseIntro}</p>
          <ul className="trinity-sku-list product-line-skus">
            {products.map((item) => (
              <li key={item._id}>
                <Link href={`/products/${item.slug}`} className="product-line-title-link">
                  {pickProductTitle(item, locale)}
                </Link>
              </li>
            ))}
          </ul>
          <p className="product-disclaimer">{ui.product.disclaimer}</p>
          <PoweredBy />
        </div>
      </main>
    </>
  );
}
