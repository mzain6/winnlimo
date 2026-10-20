import type { Metadata, Viewport } from "next";
import "@fontsource/hind/300.css";
import "@fontsource/hind/400.css";
import "@fontsource/hind/500.css";
import "@fontsource/hind/600.css";
import "@fontsource/hind/700.css";
import "@fontsource-variable/playfair-display/wght.css";
import "@fontsource-variable/playfair-display/wght-italic.css";
import "./globals.css";
import { company, formatAddress, serviceAreas } from "@/lib/data";
import { Providers } from "@/components/layout/Providers";
import { Preloader } from "@/components/layout/Preloader";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://winnlimo.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Winn Limousine | Los Angeles Corporate Black Car & Chauffeur Service",
    template: "%s | Winn Limousine",
  },
  description:
    "Winn Limousine — chauffeured black car and corporate ground transportation in Los Angeles since 1998. Airport transfers, hourly service, events and Sprinter vans. Available 24/7.",
  keywords: [
    "Los Angeles black car service",
    "LA corporate transportation",
    "LAX airport transfer",
    "chauffeur service Los Angeles",
    "Sprinter van service Los Angeles",
    "SoFi Stadium chauffeur",
  ],
  openGraph: {
    type: "website",
    siteName: company.name,
    title: "Winn Limousine | Los Angeles Corporate Black Car & Chauffeur Service",
    description: "Corporate ground transportation, airport transfers and V.I.P. chauffeur service across Los Angeles — 24/7.",
    locale: "en_US",
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#090b0e",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: company.name,
  description: "Corporate ground transportation and chauffeured black car service in Los Angeles.",
  url: siteUrl,
  telephone: company.phones[0].display,
  email: company.email,
  foundingDate: String(company.founded),
  openingHours: "Mo-Su 00:00-23:59",
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address.street,
    addressLocality: company.address.city,
    addressRegion: company.address.state,
    postalCode: company.address.zip,
    addressCountry: "US",
  },
  areaServed: serviceAreas.map((name) => ({ "@type": "City", name })),
  sameAs: company.socials.map((s) => s.href),
  hasMap: `https://www.google.com/maps/search/${encodeURIComponent(formatAddress())}`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {/* without JavaScript the loading screen could never lift, so hide it */}
        <noscript>
          <style>{"#preloader{display:none!important}"}</style>
        </noscript>
        <Providers>
          <Preloader />
          <ScrollProgress />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <FloatingActions />
        </Providers>
      </body>
    </html>
  );
}
