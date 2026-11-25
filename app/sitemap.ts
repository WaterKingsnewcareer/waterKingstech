import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { catalogIsSample, products } from "@/data/products";
import { siteUrl } from "@/lib/site";

/** Canonical, indexable pages only. New categories and products are added automatically. */
export default function sitemap(): MetadataRoute.Sitemap {
  // The site is static: each deploy is a content update, so the build time is
  // when these pages last changed.
  const lastModified = new Date();
  const page = (path: string, priority: number, changeFrequency: "daily" | "weekly" | "monthly" = "weekly") => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    page("/", 1, "daily"),
    page("/shop", 0.9, "daily"),
    ...categories.map((category) => page(`/shop/${category.slug}`, 0.9, "daily")),
    page("/uk-used", 0.8, "daily"),
    page("/brand-new", 0.8, "daily"),
    page("/repairs", 0.8),
    page("/deals", 0.8, "daily"),
    page("/referral-installment", 0.7, "monthly"),
    page("/visit", 0.7, "monthly"),
    page("/swap", 0.6),
    page("/corporate", 0.6, "monthly"),
    page("/tap-and-earn", 0.5),
    // Sample listings stay out of search until the real stock is in (they are noindex too).
    ...(catalogIsSample ? [] : products.map((product) => page(`/product/${product.id}`, 0.6))),
  ];
}
