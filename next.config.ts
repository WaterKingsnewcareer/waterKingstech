import type { NextConfig } from "next";
import { productionUrl } from "./lib/site";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // 75 is the default; 85 is used for the hero imagery only.
    qualities: [75, 85],
    remotePatterns: [
      // Royalty-free photography (Unsplash License). Replace with the shop's
      // own product photos in /public/images when they are available.
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
  poweredByHeader: false,

  async redirects() {
    return [
      // One address for search engines: the Vercel subdomain serves the same
      // pages, so send it (and its link equity) to the real domain.
      {
        source: "/:path*",
        has: [{ type: "host", value: "waterkingstech.vercel.app" }],
        destination: `${productionUrl}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
