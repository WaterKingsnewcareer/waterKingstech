import type { Metadata } from "next";
import { business } from "@/data/business";

/** The home page's search result — also the default for any page without its own. */
export const homeTitle = `${business.name} | Phones, Laptops & Repairs in Accra — Open 24/7`;
export const homeDescription =
  "UK used and brand new iPhones, Samsung phones, laptops and MacBooks in Circle & Tse Addo, Accra. Open 24/7, 3-month warranty on UK used, installment, swaps and repairs.";

type PageSeo = {
  /** Page title without the brand — the layout's template adds " | WaterKingsTech". */
  title: string;
  /** 120–160 characters: what the page offers and why to click. */
  description: string;
  /** Canonical path, e.g. "/repairs". Query strings are never part of it. */
  path: string;
  /** Social share image. Defaults to the generated /opengraph-image card. */
  image?: { url: string; alt: string };
  /** Keep the page out of search results while still letting crawlers follow its links. */
  noindex?: boolean;
  /** Use `title` exactly as written, without the brand template (the home page). */
  absoluteTitle?: boolean;
};

/**
 * One place that builds a page's search and social metadata, so the title,
 * description, canonical URL, Open Graph and X/Twitter cards always agree.
 */
export function pageMetadata({ title, description, path, image, noindex, absoluteTitle }: PageSeo): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${business.name}`;
  const images = [image ?? { url: "/opengraph-image", alt: `${business.name} — phones, laptops, accessories and repairs in Accra` }];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: business.name,
      locale: "en_GH",
      title: fullTitle,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images,
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
