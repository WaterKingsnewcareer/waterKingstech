import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // Everything public is crawlable, including CSS, JS and images. Pages that
    // shouldn't be indexed say so with a robots meta tag instead, so crawlers
    // can still follow their links.
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
