import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Bangers, Cinzel, Inter } from "next/font/google";
import { LocaleProvider } from "@/components/locale-context";
import { SiteJsonLd } from "@/components/site-json-ld";
import { getLocale, getMessages } from "@/lib/i18n";
import { absoluteUrl, getMetadataBase, siteUrl } from "@/lib/site";
import "./globals.css";

const bangers = Bangers({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bangers",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: "Night Phantom — Untamed Spirit",
  description:
    "Comic-book inspired cannabis brand. Premium vapes and more. For adults 21+ in legal jurisdictions only.",
  applicationName: "Night Phantom",
  keywords: [
    "Night Phantom",
    "cannabis",
    "Illinois",
    "vape",
    "Indus365",
    "licensed dispensary",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [{ url: "/nplogo.png", type: "image/png", sizes: "any" }],
    apple: [{ url: "/nplogo.png", type: "image/png" }],
    shortcut: "/nplogo.png",
  },
  openGraph: {
    title: "Night Phantom — Untamed Spirit",
    description:
      "Comic-book inspired cannabis brand. Premium vapes and more. For adults 21+ in legal jurisdictions only.",
    type: "website",
    locale: "en_US",
    siteName: "Night Phantom",
    url: siteUrl(),
    images: [
      {
        url: "/np-hero-main.png",
        width: 1200,
        height: 630,
        alt: "Night Phantom — comic hero over a night skyline with brand mark.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [absoluteUrl("/np-hero-main.png")],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = getMessages(locale);

  return (
    <html
      lang={locale}
      className={`${bangers.variable} ${cinzel.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <SiteJsonLd />
        <LocaleProvider locale={locale} messages={messages}>
          {children}
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  );
}
