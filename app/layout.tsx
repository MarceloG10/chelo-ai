import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://www.hhtech.dev";
const ogTitle = "Hello Human · Agentes IA, Apps y Dashboards a velocidad imposible";
const ogDescription =
  "Construimos agentes de IA, apps y dashboards que antes tomaban meses, ahora en días. Humanos + IA. Sin equipos gigantes. Sin burocracia.";

export const metadata: Metadata = {
  title: {
    default: ogTitle,
    template: "%s · Hello Human",
  },
  description: ogDescription,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🤖</text></svg>",
  },
  keywords: [
    "agente IA",
    "agente IA WhatsApp",
    "agente de ventas inteligencia artificial",
    "automatización con IA",
    "desarrollo app rápido",
    "MVP 2 semanas",
    "agencia startup MVP",
    "dashboard con inteligencia artificial",
    "visualización de datos empresas",
    "automatización backoffice IA",
    "software a medida con IA",
    "Hello Human",
    "Barcelona",
    "España",
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
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
        contactPoint: { "@type": "ContactPoint", contactType: "sales", availableLanguage: ["Spanish", "English"] },
        sameAs: ["https://wa.me/34617700922"],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Hello Human",
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: "es-ES",
      },
      {
        "@type": "Service",
        name: "Agentes de IA",
        provider: { "@id": `${siteUrl}/#organization` },
        description: "Agentes personalizados que venden, reportan y ejecutan. Integrados con WhatsApp, email y CRM. Atención 24/7, calificación de leads y automatización de backoffice.",
        serviceType: "Inteligencia Artificial",
        areaServed: ["ES", "AR", "MX", "CO"],
      },
      {
        "@type": "Service",
        name: "Desarrollo de Apps y Webs",
        provider: { "@id": `${siteUrl}/#organization` },
        description: "MVPs en 2-4 semanas. Apps móviles iOS/Android, webs, dashboards, backend y APIs con IA en cada paso del proceso.",
        serviceType: "Desarrollo de Software",
        areaServed: ["ES", "AR", "MX", "CO"],
      },
      {
        "@type": "Service",
        name: "Dashboards con IA",
        provider: { "@id": `${siteUrl}/#organization` },
        description: "Conectamos CRM, ERP, Excel y APIs en dashboards inteligentes que explican qué está pasando y qué hacer. KPIs, alertas y predicciones en tiempo real.",
        serviceType: "Visualización de Datos",
        areaServed: ["ES", "AR", "MX", "CO"],
      },
    ],
  };

  return (
    <html lang="es" data-variant="terminal">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;700&family=Geist:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
