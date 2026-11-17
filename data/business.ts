import type { ImageAsset, OpeningHours } from "@/types";

/**
 * Core business information (from WaterKingsTech's flyers).
 *
 * ⚠️  Fields set to `null` have NOT been supplied by WaterKingsTech yet.
 *     The site shows a clearly marked placeholder wherever they are used.
 *     Never replace them with guesses — only with confirmed details.
 */
export const business = {
  name: "WaterKingsTech",
  tagline: "Your Next Device. Your Trusted Tech Partner.",
  slogan: "Top quality. Best prices. Trusted service.",
  /** Tagline from the official logo (supplied 9 November 2026). */
  logoTagline: "Expert Tech Solutions, Always Reliable.",
  summary: "Phones • Laptops • Accessories • Repairs",
  description:
    "WaterKingsTech is your one-stop tech destination in Accra — genuine smartphones, laptops and accessories, professional device repairs, installment plans and referral rewards.",
  country: "Ghana",
  countryCode: "GH",

  location: {
    /** Landmark from the shop's Google Business Profile (November 2026). */
    landmark: "Beside Swift FX",
    /** Street address from the shop's Google Business Profile (November 2026). */
    address: "Rosewood Street, Tse Addo" as string | null,
    city: "Accra" as string | null,
    region: "Greater Accra" as string | null,
    /**
     * Used for the embedded map and directions until an exact pin is supplied.
     * The shop's own Google listing isn't public in Maps yet, so this points
     * to Rosewood Street in Tse Addo (this query is the one Maps pins as the
     * street). Set `mapsUrl` / `coordinates` once the listing is public.
     */
    mapQuery: "Rosewood St, Accra, Ghana",
    /** Exact shop coordinates (Google Maps → right-click the pin). Overrides mapQuery. */
    coordinates: null as { lat: number; lng: number } | null,
    /**
     * Google Maps "Embed a map" iframe src for the shop's own listing
     * (Google Maps → Share → Embed a map → copy the src="…" value). Overrides mapQuery.
     */
    mapEmbedUrl: null as string | null,
    /** The shop's own Google Maps share link (Share → Copy link), if it has a listing. */
    mapsUrl: null as string | null,
  },

  /** e.g. [{ days: "Monday – Saturday", hours: "8:00am – 7:00pm" }, { days: "Sunday", hours: "Closed" }] */
  // Supplied by WaterKingsTech on 12 November 2026: the shop works 24/7.
  openingHours: [{ days: "Every day", hours: "Open 24 hours", schema: "Mo-Su 00:00-23:59" }] as OpeningHours[] | null,

  /** Real photos of the shop front / interior. Add files to /public/images/shop. */
  shopPhotos: [] as ImageAsset[],
} as const;

export type Business = typeof business;
