import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kor4Soft | Desarrollo de Software y Apps Móviles en Colombia",
  description: "Agencia de desarrollo de software en Colombia. Expertos en desarrollo web. Transformación digital en Colombia.",
  keywords: ["desarrollo software colombia", "apps móviles cali", "desarrollo web bogotá", "agencia digital colombia", "automatización de procesos", "kor4soft", "react native colombia", "nextjs developers"],
  icons: {
    icon: "/Logo.png",
    shortcut: "/Logo.png",
    apple: "/Logo.png",
  },
  openGraph: {
    title: "Kor4Soft | Desarrollo de Software y Apps Móviles",
    description: "Expertos en transformar ideas en soluciones digitales. Desarrollo web, móvil y automatización en Colombia.",
    url: 'https://k4soft.com',
    siteName: 'Kor4Soft',
    locale: 'es_CO',
    type: 'website',
  },
  other: {
    "google-adsense-account": "ca-pub-8399016875001290"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Kor4Soft",
    "image": "https://k4soft.com/Logo.png",
    "description": "Agencia de desarrollo de software especializada en aplicaciones web, móviles y automatización en Colombia.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Cali",
      "addressRegion": "Valle del Cauca",
      "addressCountry": "CO"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 3.4516,
      "longitude": -76.5320
    },
    "url": "https://k4soft.com",
    "telephone": "+571234567890",
    "email": "kor4softsas@gmail.com",
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    }
  };

  return (
    <html lang="es" className={inter.variable}>
      <head>
        <Script id="consent-mode-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              wait_for_update: 500
            });
          `}
        </Script>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8399016875001290"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScrollWrapper>
          {children}
        </SmoothScrollWrapper>
        <CookieConsentBanner />
        {/* Scripts necesarios para el navbar glass-element */}
        <Script src="/js/displacement-utils.js?v=2" strategy="afterInteractive" />
        <Script src="/js/glass-element.js?v=2" strategy="afterInteractive" />
      </body>
    </html>
  );
}

