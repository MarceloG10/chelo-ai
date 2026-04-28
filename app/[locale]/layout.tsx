import type { Metadata } from "next";
import {
  Geist,
  JetBrains_Mono,
  Space_Grotesk,
  Instrument_Serif,
} from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "../globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap", preload: true });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "optional", preload: false });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "optional", preload: false });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif", display: "optional", preload: false });

const siteUrl = "https://www.hhtech.dev";
const ogTitle = "Hello Human · Apps, webs y productos digitales a velocidad imposible";
const ogDescription =
  "Construimos apps móviles, webs y productos digitales que antes tomaban meses, ahora en semanas. Humanos + IA. Sin equipos gigantes. Sin burocracia.";

export const metadata: Metadata = {
  title: { default: ogTitle, template: "%s · Hello Human" },
  description: ogDescription,
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🤖</text></svg>",
  },
  keywords: [
    "agente IA", "agente IA WhatsApp", "automatización con IA",
    "desarrollo app rápido", "MVP 2 semanas", "dashboard con inteligencia artificial",
    "Hello Human", "Barcelona", "España",
  ],
  openGraph: {
    title: ogTitle,
    description: ogDescription,
    url: siteUrl,
    siteName: "Hello Human",
    type: "website",
    images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: ogTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: ogDescription,
    images: [`${siteUrl}/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  const messages = await getMessages();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Hello Human",
        url: siteUrl,
        logo: { "@type": "ImageObject", url: `${siteUrl}/og-image.png` },
        description: ogDescription,
        address: { "@type": "PostalAddress", addressLocality: "Barcelona", addressCountry: "ES" },
        contactPoint: { "@type": "ContactPoint", contactType: "sales", availableLanguage: ["Spanish", "English", "Catalan"] },
        sameAs: ["https://wa.me/34617700922"],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Hello Human",
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: locale === "en" ? "en-US" : locale === "ca" ? "ca-ES" : "es-ES",
      },
    ],
  };

  return (
    <html
      lang={locale}
      data-variant="terminal"
      className={`${geist.variable} ${mono.variable} ${grotesk.variable} ${serif.variable}`}
    >
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-B252CH7J7L" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-B252CH7J7L');
        `}} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
