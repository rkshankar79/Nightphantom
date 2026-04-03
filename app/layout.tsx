import type { Metadata } from "next";
import { Bangers, Cinzel, Inter } from "next/font/google";
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
  metadataBase: new URL("https://nightphantomhq.com"),
  title: "Night Phantom — Untamed Spirit",
  description:
    "Comic-book inspired cannabis brand. Premium vapes and more. For adults 21+ in legal jurisdictions only.",
  openGraph: {
    title: "Night Phantom — Untamed Spirit",
    description:
      "Comic-book inspired cannabis brand. Premium vapes and more. For adults 21+ in legal jurisdictions only.",
    type: "website",
    images: [
      {
        url: "/np-hero-main.png",
        alt: "Night Phantom — comic hero over a night skyline with brand mark.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/np-hero-main.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bangers.variable} ${cinzel.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
