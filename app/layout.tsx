import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kor4Soft | Desarrollo de Software y Apps Móviles en Colombia",
  description: "Agencia de desarrollo de software en Colombia. Expertos en desarrollo web, aplicaciones móviles (iOS/Android) y automatización de procesos. Transformación digital en Cali, Bogotá y Medellín.",
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
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        {/* Scripts necesarios para el navbar glass-element */}
        <Script src="/js/displacement-utils.js" strategy="beforeInteractive" />
        <Script src="/js/glass-element.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}

