import { business } from "@/data/business";
import { contact } from "@/data/contact";
import { warranty } from "@/data/offers";
import { installment } from "@/data/programs";
import { repairServices } from "@/data/repairs";
import { inSentence } from "@/lib/format";

export type Faq = {
  question: string;
  /** Plain text: it is also given to search engines as the answer. */
  answer: string;
  link?: { href: string; label: string };
};

/**
 * Questions customers search for, answered ONLY with details WaterKingsTech
 * has confirmed. Answers are built from /data so they never drift from the
 * rest of the site. Don't add a question whose answer isn't known yet
 * (delivery, exact repair times, installment terms…).
 */
const hours = business.openingHours?.[0];
const ukWarranty = warranty["uk-used"];
const repairNames = repairServices
  .filter((service) => service.icon !== "quick-repair")
  .map((service) => inSentence(service.name));

function list(items: string[]): string {
  return items.length > 1 ? `${items.slice(0, -1).join(", ")} and ${items.at(-1)}` : (items[0] ?? "");
}

export const faqs: Faq[] = [
  {
    question: `Where is ${business.name} located?`,
    answer: `We have ${business.branches.length} shops in ${business.city}: ${list(business.branches.map((branch) => `${branch.address} (${branch.landmark})`))}. Come in to see and test devices or get a repair checked.`,
    link: { href: "/visit", label: "Get directions" },
  },
  ...(hours
    ? [
        {
          question: `What time does ${business.name} open?`,
          answer:
            hours.hours === "Open 24 hours"
              ? "We're open 24 hours a day, every day of the week — including weekends and holidays."
              : `${hours.days}: ${hours.hours}.`,
        },
      ]
    : []),
  {
    question: "Do you sell UK used or brand new phones and laptops?",
    answer: `Both. UK used phones and laptops are tested before sale and graded${ukWarranty ? `, and come with a ${ukWarranty.toLowerCase()}` : ""}. Brand new devices are factory sealed, fresh in the box.`,
    link: { href: "/uk-used", label: "See UK used devices" },
  },
  {
    question: "Can I buy a phone or laptop on installment?",
    // Keep in step with installment.eligibleItems in data/programs.ts.
    answer: `Yes — every phone (UK used or brand new), MacBooks and iPads can be bought on installment. ${installment.notEligible} Message us on WhatsApp for the current requirements.`,
    link: { href: "/referral-installment#installment", label: "How installment works" },
  },
  {
    question: "What phone and laptop repairs do you do?",
    answer: `${list(repairNames).replace(/^./, (c) => c.toUpperCase())}. Tell us what's wrong on WhatsApp and we'll advise you.`,
    link: { href: "/repairs", label: "See all repairs" },
  },
  {
    question: "Can I swap my old phone or laptop for a new one?",
    answer:
      "Yes. Trade in your old phone or laptop towards a UK used or brand new one — we check your device at the shop and tell you what to add.",
    link: { href: "/swap", label: "Start a swap" },
  },
  {
    question: "Do you give free gifts with phones and laptops?",
    // Keep in step with giftByCategory in data/offers.ts.
    answer: "Yes — a free case and screen protector with every phone, and a free laptop bag with every laptop.",
    link: { href: "/deals", label: "See today's deals" },
  },
  {
    question: "How do I buy, and are prices negotiable?",
    answer: `Find the item on the website and tap Buy on WhatsApp to confirm the price and that it's in stock${contact.phoneDisplay ? `, or call ${contact.phoneDisplay}` : ""}. Prices are negotiable — you can make us an offer.`,
    link: { href: "/shop", label: "Browse the shop" },
  },
  {
    question: "Do you supply laptops in bulk to companies and schools?",
    answer:
      "Yes. Companies, schools and NGOs can request a formal quotation for bulk laptops, phones and accessories, with official invoicing and long-term repair support.",
    link: { href: "/corporate", label: "Request a quote" },
  },
];
