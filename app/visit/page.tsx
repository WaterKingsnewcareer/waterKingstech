import { MapPin } from "lucide-react";
import type { Metadata } from "next";
import { PortalBanner } from "@/components/sections/PortalBanner";
import { Reviews } from "@/components/sections/Reviews";
import { VisitShop } from "@/components/sections/VisitShop";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { business } from "@/data/business";
import { pageMetadata } from "@/lib/seo";

const branchList = business.branches.map((branch) => `${branch.address} (${branch.landmark})`).join(" and ");

export const metadata: Metadata = pageMetadata({
  title: `Phone & Laptop Shops in ${business.areas}, Accra — 24/7`,
  description: `Visit WaterKingsTech at ${branchList}, Accra. Open 24 hours, every day. Get directions, call 054 260 9094 or chat on WhatsApp.`,
  path: "/visit",
});

export default function VisitPage() {
  return (
    <div className="container-x pt-4 sm:pt-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Visit us" }]} />

      <div className="mt-4">
        <PortalBanner
          tone="white"
          title={`Visit our shops in ${business.areas}`}
          lead={`Two branches in Accra: ${branchList}. Come and see devices in person, get a repair checked or ask about installment.`}
          icon={MapPin}
          points={[`${business.branches.length} branches`, "Open 24/7", "Live Google maps", "Repairs on site"]}
        />
      </div>

      <VisitShop className="mt-6" />

      <section id="reviews" aria-labelledby="reviews-title" className="mt-10 scroll-mt-32">
        <SectionHeader
          id="reviews-title"
          title="What our customers say"
          description="Bought a device or had a repair with us? We'd love to hear about it."
        />
        <Reviews className="mt-4" />
      </section>
    </div>
  );
}
