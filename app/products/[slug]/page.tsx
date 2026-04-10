import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import type { Metadata } from "next";
import { PoweredBy } from "@/components/powered-by";
import { SiteNav } from "@/components/site-nav";
import { getProductBySlug, getTrinityProducts } from "@/lib/sanity/fetch";
import { getLocale, getMessages } from "@/lib/i18n";
import {
  pickProductBody,
  pickProductTitle,
  pickShortDescription,
  pickListingLabel,
} from "@/lib/i18n/product-copy";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const items = await getTrinityProducts();
  return items.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    const locale = await getLocale();
    return { title: locale === "es" ? "Producto" : "Product" };
  }
  const locale = await getLocale();
  const displayTitle = pickProductTitle(product, locale);
  const desc =
    pickShortDescription(product, locale) ||
    pickListingLabel(product, locale);
  const path = `/products/${slug}`;
  return {
    title: `${displayTitle} — Night Phantom`,
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      title: `${displayTitle} — Night Phantom`,
      description: desc,
      type: "website",
      url: path,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const locale = await getLocale();
  const ui = getMessages(locale);
  const p = ui.product;

  const formatLabel =
    product.format === "preroll"
      ? p.formatPreroll
      : product.format === "vape"
        ? p.formatVape
        : p.formatFlower;

  const displayTitle = pickProductTitle(product, locale);
  const displayShort = pickShortDescription(product, locale);
  const bodyContent = pickProductBody(product, locale);

  return (
    <>
      <SiteNav />
      <main className="product-page" id="main-content">
        <div className="product-page-inner np-section">
          <Link className="product-back" href="/#trinity">
            {p.back}
          </Link>
          <p className="section-label">{formatLabel}</p>
          <h1 className="product-title">{displayTitle}</h1>
          {product.thcDisplay ? (
            <p className="product-meta">
              {p.thcPrefix} {product.thcDisplay}
            </p>
          ) : null}
          {displayShort ? (
            <p className="product-lede">{displayShort}</p>
          ) : null}

          {product.format === "vape" ? (
            <p className="product-vape-tech">
              <Link href="/vape-tech">{p.vapeTechLink}</Link>
            </p>
          ) : null}

          {product.images && product.images.length > 0 ? (
            <div className="product-gallery">
              {product.images.map((img, i) => {
                const url = img.asset?.url;
                if (!url) return null;
                const w = img.asset?.metadata?.dimensions?.width ?? 1200;
                const h = img.asset?.metadata?.dimensions?.height ?? 1200;
                return (
                  <Image
                    key={img._key || url + i}
                    src={url}
                    alt={img.alt || displayTitle}
                    width={Math.min(w, 1100)}
                    height={Math.min(h, 1100)}
                    className="product-gallery-img"
                    sizes="(max-width: 900px) 100vw, 880px"
                  />
                );
              })}
            </div>
          ) : null}

          {bodyContent ? (
            <div className="product-body">
              <PortableText value={bodyContent} />
            </div>
          ) : null}

          {product.coaUrl ? (
            <p className="product-coa">
              <a href={product.coaUrl} target="_blank" rel="noopener noreferrer">
                {p.coaLink}
              </a>
            </p>
          ) : null}

          <p className="product-disclaimer">{p.disclaimer}</p>

          <p className="contact-privacy-wrap">
            <Link className="footer-privacy-link" href="/privacy">
              {ui.home.privacyLink}
            </Link>
          </p>
          <PoweredBy />
        </div>
      </main>
    </>
  );
}
