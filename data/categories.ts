import { unsplash } from "@/lib/images";
import type { Category, CategoryId, CategorySlug, SubcategoryId } from "@/types";

export const categories: Category[] = [
  {
    id: "smartphones",
    slug: "phones",
    label: "Smartphones",
    shortLabel: "Phones",
    description: "iPhone, Samsung and more — UK used and brand new.",
    seo: {
      title: "UK Used & New Phones in Accra — iPhone, Samsung",
      description:
        "UK used and brand new iPhones, Samsung Galaxy and more in Circle & Tse Addo, Accra. 3-month warranty on UK used, free case and screen protector, installment available.",
    },
    image: {
      src: unsplash("1592750475338-74b7b21085ab", 1400),
      alt: "Graphite iPhone with triple camera on a dark background",
    },
    subcategories: [
      { id: "iphone", label: "iPhone" },
      { id: "samsung", label: "Samsung" },
      { id: "other-phones", label: "Other phones" },
    ],
  },
  {
    id: "laptops",
    slug: "laptops",
    label: "Laptops & MacBooks",
    shortLabel: "Laptops",
    description: "Windows laptops and MacBooks for work, school and creativity.",
    seo: {
      title: "UK Used & New Laptops and MacBooks in Accra",
      description:
        "HP, Dell, Lenovo laptops and MacBooks, UK used and brand new, in Circle & Tse Addo, Accra. Save up to 40% with a free laptop bag. MacBooks on installment.",
    },
    image: {
      src: unsplash("1515803171005-2d5e90f7b4d3", 1400),
      alt: "Black MacBook Pro open on a dark desk",
    },
    subcategories: [
      { id: "windows", label: "Windows laptops" },
      { id: "macbook", label: "MacBooks" },
    ],
  },
  {
    id: "accessories",
    slug: "accessories",
    label: "Accessories",
    shortLabel: "Accessories",
    description: "SSDs, pen drives, screens, earbuds, chargers and more.",
    seo: {
      title: "Laptop & Phone Accessories in Accra — SSDs, Chargers, Earbuds",
      description:
        "SSDs, pen drives, laptop and phone screens, earbuds, chargers and more at WaterKingsTech, Circle & Tse Addo, Accra. Ask on WhatsApp for the price and availability.",
    },
    image: {
      src: unsplash("1609692814858-f7cd2f0afa4f", 1400),
      alt: "Smartphone, smartwatch and wireless earbuds on a wooden surface",
    },
    subcategories: [
      { id: "ssd", label: "SSDs" },
      { id: "pen-drives", label: "Pen drives" },
      { id: "screens", label: "Screens" },
      { id: "earbuds", label: "Earbuds" },
      { id: "chargers", label: "Chargers" },
      { id: "other-accessories", label: "Other accessories" },
    ],
  },
];

export function getCategory(id: CategoryId): Category {
  const category = categories.find((c) => c.id === id);
  if (!category) throw new Error(`Unknown category: ${id}`);
  return category;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === (slug as CategorySlug));
}

export function getSubcategoryLabel(id: SubcategoryId): string {
  for (const category of categories) {
    const sub = category.subcategories.find((s) => s.id === id);
    if (sub) return sub.label;
  }
  return id;
}
