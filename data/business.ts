import type { Branch, OpeningHours } from "@/types";

/**
 * Core business information.
 *
 * ⚠️  Fields set to `null` have NOT been supplied by WaterKingsTech yet.
 *     The site shows a clearly marked placeholder wherever they are used.
 *     Never replace them with guesses — only with confirmed details.
 */

/**
 * The shop's two branches (confirmed by the site owner on 25 November 2026).
 * Every address on the site — footer, visit page, map, directions, FAQ and the
 * structured data for search engines — is built from this list.
 */
const branches: Branch[] = [
  {
    id: "circle",
    name: "Circle branch",
    area: "Circle",
    // From the owner's flyers.
    address: "Circle Mall, Tip Toe Lane",
    landmark: "Blue Gate, Gate 2 Exit",
    city: "Accra",
    region: "Greater Accra",
    // Google Maps pins Tip Toe Lane with Circle Mall labelled beside it.
    mapQuery: "Tip Toe Lane, Accra, Ghana",
    coordinates: null,
    mapEmbedUrl: null,
    mapsUrl: null,
  },
  {
    id: "rosewood",
    name: "Tse Addo branch",
    area: "Tse Addo",
    // From the shop's Google Business Profile (November 2026).
    address: "Rosewood Street, Tse Addo",
    landmark: "Beside Swift FX",
    city: "Accra",
    region: "Greater Accra",
    // The branch's own Google listing isn't public in Maps yet; this query pins Rosewood Street.
    mapQuery: "Rosewood St, Accra, Ghana",
    coordinates: null,
    mapEmbedUrl: null,
    mapsUrl: null,
  },
];

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
  city: "Accra",

  branches,
  /** "Circle & Tse Addo" — for short copy such as page descriptions. */
  areas: branches.map((branch) => branch.area).join(" & "),

  /** e.g. [{ days: "Monday – Saturday", hours: "8:00am – 7:00pm" }, { days: "Sunday", hours: "Closed" }] */
  // Supplied by WaterKingsTech on 12 November 2026: the shop works 24/7.
  openingHours: [{ days: "Every day", hours: "Open 24 hours", schema: "Mo-Su 00:00-23:59" }] as OpeningHours[] | null,
} as const;

export type Business = typeof business;
