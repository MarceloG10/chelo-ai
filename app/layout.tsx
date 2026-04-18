import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://chelo.hhtech.dev";
const ogTitle = "Hello Human — Agentes de IA, Apps y Digitalización";
const ogDescription =
  "Humanos + IA. Construimos agentes, apps y sistemas que antes tomaban meses — ahora en días. Sin equipos gigantes. Sin burocracia. Sin humo.";

export const metadata: Metadata = {
  title: ogTitle,
  description: ogDescription,
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🤖</text></svg>",
  },
  keywords: [
    "agentes IA",
    "inteligencia artificial",
    "automatización",
    "apps",
    "digitalización",
    "Barcelona",
    "WhatsApp bot",
    "Next.js",
  ],
  openGraph: {
    title: ogTitle,
    description: ogDescription,
    url: siteUrl,
    siteName: "Hello Human",
    type: "website",
    locale: "es_ES",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: ogTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: ogDescription,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" data-variant="terminal">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;700&family=Geist:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
