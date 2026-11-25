import type { Metadata } from "next";
import { BundleBanners } from "@/components/home/BundleBanners";
import { Listing } from "@/components/products/Listing";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { products } from "@/data/products";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Laptop & Phone Deals in Accra — Save up to 40%",
  description:
    "Buy a laptop and save up to 40% plus a free laptop bag, or get a free case and screen protector with a phone. WaterKingsTech deals in Circle & Tse Addo, Accra.",
  path: "/deals",
});

export default function DealsPage() {
  return (
    <div className="container-x pt-4 sm:pt-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Hot deals" }]} />
      <BundleBanners className="mt-4" />
      <div className="mt-6">
        <Listing title="Hot deals" products={products.filter((p) => p.deal)} fixed={{ dealsOnly: true }} />
      </div>
    </div>
  );
}
