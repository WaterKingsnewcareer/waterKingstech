import type { Testimonial } from "@/types";

/**
 * Customer reviews.
 *
 * Only add GENUINE reviews, with the customer's permission. Never write or
 * edit a review on a customer's behalf. Until the first one is added, the site
 * shows an honest "verified reviews only" panel instead of review cards.
 *
 * To add a review, copy this shape into the list:
 *
 *   {
 *     id: "kofi-iphone-15-pro",
 *     name: "Kofi A.",                    // as the customer agreed to be shown
 *     context: "Bought an iPhone 15 Pro",
 *     quote: "…the customer's own words…",
 *     date: "2026-11",                    // month of purchase or review
 *     location: "Accra",
 *     rating: 5,                          // ONLY if the customer gave a rating
 *     verification: { method: "whatsapp-order" },
 *   },
 *
 * Set `verification` only after matching the review to a real order or repair:
 *   "whatsapp-order" – the review came from the same WhatsApp chat as the order
 *   "shop-receipt"   – matched to an in-store sale or repair receipt
 *   "google"         – posted on the shop's Google profile; add `url` to the review
 * That is what the green "Verified buyer" badge promises visitors.
 */
export const testimonials: Testimonial[] = [
  // Supplied by the site owner on 25 November 2026, with the customers' photos.
  // Not yet matched to an order or receipt, so they show without the Verified buyer badge.
  {
    id: "bright-anyawe-laptops-chargers",
    name: "Bright Anyawe",
    role: "Founder, Optisware Digital Solutions",
    context: "Laptops and chargers",
    quote:
      "WaterKingsTech has been my trusted source for high-quality laptops and affordable chargers for both my own work and my clients. Their reliable hardware, fair pricing, and dependable customer support consistently deliver real value, making it easy to equip individuals and businesses with machines they can count on. I strongly recommend WaterKingsTech to anyone looking for quality laptops and accessories.",
    photo: { src: "/images/reviews/bright-anyawe.jpg", alt: "Bright Anyawe" },
  },
  {
    id: "elijah-ansokuu-laptop",
    name: "Elijah Ngmenkpieo Ansokuu",
    role: "Student, Palm University College",
    context: "Bought a laptop",
    quote:
      "The laptop is performing very well so far, and we have not encountered any challenges—I hope it is going to take us far. The battery life, storage, and speed make it so good to use. It has met all my expectations because, as a student, I am able to use it efficiently to achieve all my goals. It has been a great tool so far, and the buying process was very smooth with no challenges at all. I recommend anyone looking to purchase a laptop to contact WaterKingsTech to have their needs met.",
    photo: { src: "/images/reviews/elijah-ansokuu.jpg", alt: "Elijah Ngmenkpieo Ansokuu" },
  },
];

/**
 * Links to the shop's Google Business profile, once it has one.
 * `read`  — Google Maps → the shop → Reviews → Share → copy link
 * `write` — Google Business Profile → "Ask for reviews" → copy the review link
 */
export const reviewLinks = {
  read: null as string | null,
  write: null as string | null,
};

export const verifiedReviews = testimonials.filter((t) => t.verification);

/** Average of the ratings verified customers actually gave, or null if none. */
export function ratingSummary(reviews: Testimonial[] = verifiedReviews) {
  const rated = reviews.filter((t) => typeof t.rating === "number");
  if (rated.length === 0) return null;
  const average = rated.reduce((sum, t) => sum + (t.rating ?? 0), 0) / rated.length;
  return { average: Math.round(average * 10) / 10, count: rated.length };
}
