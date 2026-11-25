import { business } from "@/data/business";
import { contact } from "@/data/contact";
import { conditionLabel } from "@/data/offers";
import { absoluteUrl, siteUrl } from "@/lib/site";
import type { Availability, Branch, Product, RepairService } from "@/types";

/**
 * schema.org JSON-LD, built only from what's in /data. Nothing here may
 * describe something the shop hasn't confirmed: missing details are left out
 * rather than guessed, and they appear automatically once added to /data.
 */

const businessId = `${siteUrl}/#business`;
const websiteId = `${siteUrl}/#website`;

/** Other ways people write the name (the logo reads "WATER KINGS TECH"). */
const alternateNames = ["Water Kings Tech", "WaterKings Tech"];

function postalAddress(branch: Branch) {
  return {
    "@type": "PostalAddress",
    streetAddress: `${branch.address} (${branch.landmark})`,
    addressLocality: branch.city,
    addressRegion: branch.region,
    addressCountry: business.countryCode,
  };
}

const storeId = (branch: Branch) => `${siteUrl}/#store-${branch.id}`;

/**
 * The business, its branches and the website, emitted on every page by the
 * root layout. The business is an Organization; each branch is an
 * ElectronicsStore with its own address, linked back to it.
 */
export function siteJsonLd() {
  const { branches, openingHours } = business;
  // schema.org expects e.g. "Mo-Su 00:00-23:59", not the display text.
  const openingHoursSchema = (openingHours ?? []).flatMap((row) => (row.schema ? [row.schema] : []));
  const shared = {
    ...(contact.phone ? { telephone: contact.phone } : {}),
    ...(contact.email ? { email: contact.email } : {}),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: business.name,
        alternateName: alternateNames,
        inLanguage: "en-GH",
        publisher: { "@id": businessId },
      },
      {
        "@type": "Organization",
        "@id": businessId,
        name: business.name,
        alternateName: alternateNames,
        slogan: business.slogan,
        description: business.description,
        url: siteUrl,
        logo: absoluteUrl("/brand/logo-original.png"),
        image: absoluteUrl("/opengraph-image"),
        ...shared,
        ...(contact.socials.length ? { sameAs: contact.socials.map((s) => s.href) } : {}),
        department: branches.map((branch) => ({ "@id": storeId(branch) })),
        areaServed: [
          { "@type": "City", name: business.city },
          { "@type": "Country", name: business.country },
        ],
        knowsAbout: [
          "Smartphones",
          "UK used phones",
          "Laptops",
          "MacBooks",
          "Computer accessories",
          "Phone repair",
          "Laptop repair",
          "SSD and HDD upgrades",
          "RAM upgrades",
        ],
      },
      ...branches.map((branch) => ({
        "@type": "ElectronicsStore",
        "@id": storeId(branch),
        name: `${business.name} — ${branch.name}`,
        parentOrganization: { "@id": businessId },
        url: absoluteUrl("/visit"),
        image: absoluteUrl("/opengraph-image"),
        address: postalAddress(branch),
        ...shared,
        ...(branch.coordinates
          ? { geo: { "@type": "GeoCoordinates", latitude: branch.coordinates.lat, longitude: branch.coordinates.lng } }
          : {}),
        ...(branch.mapsUrl ? { hasMap: branch.mapsUrl } : {}),
        ...(openingHoursSchema.length ? { openingHours: openingHoursSchema } : {}),
        currenciesAccepted: "GHS",
      })),
    ],
  };
}

/** Breadcrumb trail. The last crumb is the current page and needs no link. */
export function breadcrumbJsonLd(items: { label: string; href?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };
}

/** "on-request" means "ask us", which has no schema.org equivalent, so it is left out. */
const schemaAvailability: Record<Availability, string | null> = {
  "in-stock": "https://schema.org/InStock",
  "limited-stock": "https://schema.org/LimitedAvailability",
  "out-of-stock": "https://schema.org/OutOfStock",
  "on-request": null,
};

/**
 * A real product listing. Only use it for genuine stock (`catalogIsSample`
 * false): it puts the price and availability into search results.
 */
export function productJsonLd(product: Product, title: string) {
  const condition = product.condition === "brand-new" ? "https://schema.org/NewCondition" : "https://schema.org/UsedCondition";
  const url = absoluteUrl(`/product/${product.id}`);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: `${title} (${conditionLabel[product.condition]})`,
    url,
    image: [product.image.src],
    description: product.highlight ?? product.specs.join(", "),
    sku: product.id,
    itemCondition: condition,
    ...(product.price !== null
      ? {
          offers: {
            "@type": "Offer",
            url,
            price: product.price,
            priceCurrency: "GHS",
            ...(schemaAvailability[product.availability] ? { availability: schemaAvailability[product.availability] } : {}),
            itemCondition: condition,
            seller: { "@id": businessId },
          },
        }
      : {}),
  };
}

/** The repair services offered at the shop. */
export function repairServicesJsonLd(services: RepairService[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Phone and laptop repairs at ${business.name}`,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        serviceType: "Phone and laptop repair",
        provider: { "@id": businessId },
        areaServed: { "@type": "City", name: business.city },
      },
    })),
  };
}

/** Questions and answers that are shown on the same page. */
export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** Serialises JSON-LD safely for a <script> tag. */
export function toJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** <script type="application/ld+json"> props for a JSON-LD object. */
export function jsonLdScriptProps(data: unknown) {
  return { type: "application/ld+json", dangerouslySetInnerHTML: { __html: toJsonLd(data) } } as const;
}
