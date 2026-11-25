/**
 * The live address of the site. waterkingstech.com and waterkingstech.vercel.app
 * both redirect here, so every canonical URL, the sitemap and Open Graph links
 * use it. NEXT_PUBLIC_SITE_URL overrides it (e.g. for a staging copy).
 */
export const productionUrl = "https://www.waterkingstech.com";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.NODE_ENV === "production" ? productionUrl : "http://localhost:3000")
).replace(/\/$/, "");

/** Absolute URL for a site path, e.g. "/repairs" → "https://www.waterkingstech.com/repairs". */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  // The home page has no trailing slash, matching its canonical URL.
  if (path === "/" || path === "") return siteUrl;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
