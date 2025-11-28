import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kor4Soft - Landing Page",
  description: "Landing page de Kor4Soft",
  icons: {
    icon: "/Logo.png",
    shortcut: "/Logo.png",
    apple: "/Logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
        <Script src="/js/displacement-utils.js" strategy="beforeInteractive" />
        <Script src="/js/glass-element.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}

