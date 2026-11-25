import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { PromoTicker } from "@/components/layout/PromoTicker";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { ReferralCapture } from "@/components/referral/ReferralCapture";
import { business } from "@/data/business";
import { homeDescription, homeTitle } from "@/lib/seo";
import { siteUrl } from "@/lib/site";
import { jsonLdScriptProps, siteJsonLd } from "@/lib/structured-data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/** Display face — its wide, heavy capitals echo the "WATER KINGS" wordmark. */
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

/** Search engine ownership checks (Google Search Console, Bing Webmaster Tools). */
const verification = {
  // Google Search Console, property https://www.waterkingstech.com/ (the token is public by design).
  // public/google093db1cd883cebb0.html verifies the same property; keep both.
  google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "BM2PAkplIu6MskhguFOdI-cuvgdpe1vTtptD09c0Iw0",
  ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
    ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } }
    : {}),
};

/** Site-wide defaults. Each page sets its own title, description and canonical URL with pageMetadata(). */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: homeTitle,
    template: `%s | ${business.name}`,
  },
  description: homeDescription,
  applicationName: business.name,
  category: "shopping",
  creator: business.name,
  publisher: business.name,
  keywords: [
    "WaterKingsTech",
    "Water Kings Tech",
    "phone shop in Accra",
    "laptop shop in Accra",
    "UK used phones Accra",
    "UK used laptops Ghana",
    "iPhones in Ghana",
    "MacBooks in Accra",
    "phone repair Accra",
    "laptop repair Accra",
    "phones on installment Ghana",
    "Circle Mall Accra",
    "Tse Addo",
  ],
  openGraph: {
    type: "website",
    siteName: business.name,
    locale: "en_GH",
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  ...(Object.keys(verification).length ? { verification } : {}),
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#062a5c",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GH"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}
    >
      <body className="min-h-dvh pb-action-bar">
        <script {...jsonLdScriptProps(siteJsonLd())} />
        <a
          href="#main"
          className="fixed top-3 left-3 z-[70] -translate-y-20 rounded-lg bg-royal-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <MotionProvider>
          <PromoTicker />
          <SiteHeader />
          <main id="main">{children}</main>
          <Footer />
          <FloatingWhatsApp />
          <MobileActionBar />
          <ReferralCapture />
        </MotionProvider>
      </body>
    </html>
  );
}
