import { ArrowLeftRight, CalendarClock, Gift, Mail, MapPin, Navigation, Phone, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OfferBox } from "@/components/products/OfferBox";
import { ProductGrid } from "@/components/products/ProductGrid";
import { AssuranceChip, AvailabilityNote, ConditionChip, DealTag, Price, WarrantyChip } from "@/components/products/ProductBits";
import { ReferredByNote } from "@/components/referral/ReferredByNote";
import { TapEarnButton } from "@/components/referral/TapEarnButton";
import { WhatsAppBuyLink } from "@/components/referral/WhatsAppBuyLink";
import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { business } from "@/data/business";
import { getCategory, getSubcategoryLabel } from "@/data/categories";
import { conditionLabel, giftByCategory, isNegotiable, isSwappable, warrantyFor, warrantyPending } from "@/data/offers";
import { catalogIsSample, getProduct, products } from "@/data/products";
import { isInstallmentEligible } from "@/data/programs";
import { callHref, directionsHref, directionsHrefFor, emailHref, productMessage, productTitle, whatsappHref, whatsappMessages } from "@/lib/contact-links";
import { pageMetadata } from "@/lib/seo";
import { jsonLdScriptProps, productJsonLd } from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: PageProps<"/product/[id]">): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return {};
  const title = `${productTitle(product)} (${conditionLabel[product.condition]})`;
  return pageMetadata({
    title: `${title} in Accra`,
    description: `${title} at ${business.name}, ${business.areas}, Accra. ${product.specs.join(", ")}. Ask the price and buy on WhatsApp.`,
    path: `/product/${product.id}`,
    image: { url: product.image.src, alt: product.image.alt },
    // Sample listings (placeholder stock and prices) stay out of search results.
    noindex: catalogIsSample,
  });
}

export default async function ProductPage({ params }: PageProps<"/product/[id]">) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const category = getCategory(product.category);
  const title = productTitle(product);
  const gift = giftByCategory[product.category];
  const productWarranty = warrantyFor(product);
  const mail = emailHref(`Enquiry: ${title}`, productMessage(product));
  const similar = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const details: [string, string][] = [
    ["Category", category.label],
    ["Type", getSubcategoryLabel(product.subcategory)],
    ["Condition", conditionLabel[product.condition]],
    ...(product.grade ? ([["Grade", product.grade]] as [string, string][]) : []),
    ...(product.variant ? ([["Variant", product.variant]] as [string, string][]) : []),
    ["Warranty", productWarranty ?? warrantyPending],
    ["Price", isNegotiable(product) ? "Negotiable" : "Fixed"],
    ...(isSwappable(product) ? ([["Swap", "Accepted — trade in your old device"]] as [string, string][]) : []),
  ];

  return (
    <div className="container-x pt-4 sm:pt-6">
      {catalogIsSample ? null : <script {...jsonLdScriptProps(productJsonLd(product, title))} />}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: category.shortLabel, href: `/shop/${category.slug}` },
          { label: product.name },
        ]}
      />

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.25fr_1fr] lg:gap-5">
        <div className="contents lg:flex lg:flex-col lg:gap-4">
          <div className="relative order-1 aspect-[4/3] overflow-hidden rounded-xl border border-ice-200 bg-white">
            <Image
              src={product.image.src}
              alt={product.image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 680px, 100vw"
              className="object-cover"
            />
            {product.deal ? <DealTag deal={product.deal} className="absolute top-3 left-3 text-[0.78rem]" /> : null}
          </div>

          <section aria-labelledby="details-title" className="order-4 rounded-xl border border-ice-200 bg-white p-5">
            <h2 id="details-title" className="font-display text-lg font-bold text-ink">
              Details
            </h2>
            {product.highlight ? <p className="mt-2 text-ink-soft">{product.highlight}</p> : null}
            <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2.5 text-sm">
              {details.map(([label, value]) => (
                <div key={label} className="contents">
                  <dt className="text-ink-muted">{label}</dt>
                  <dd className="font-semibold text-ink">{value}</dd>
                </div>
              ))}
            </dl>
            <h3 className="mt-5 text-sm font-bold text-ink">Key specs</h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {product.specs.map((spec) => (
                <li key={spec} className="rounded-lg bg-ice px-3 py-1.5 text-sm text-ink-soft">
                  {spec}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="contents lg:sticky lg:top-32 lg:flex lg:flex-col lg:gap-4 lg:self-start">
          <section aria-label="Buy" className="order-2 rounded-xl border border-ice-200 bg-white p-5">
            {product.price !== null ? <Price product={product} size="lg" /> : null}
            <h1 className="font-display text-xl leading-snug font-bold text-ink sm:text-2xl">{title}</h1>
            {product.price === null ? <Price product={product} size="lg" /> : null}
            <p className="mt-2 flex items-start gap-1 text-sm text-ink-muted">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {business.branches.map((branch) => branch.address).join(" · ")}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <ConditionChip product={product} />
              <WarrantyChip product={product} />
              <AssuranceChip product={product} />
            </div>
            <AvailabilityNote product={product} className="mt-2" />

            {gift ? (
              <p className="mt-4 flex items-center gap-2.5 rounded-lg bg-gift-bg px-3.5 py-3 text-sm font-bold text-gift">
                <Gift className="size-5 shrink-0" aria-hidden="true" />
                {gift} with this purchase
              </p>
            ) : null}

            <div className="mt-4 flex flex-col gap-2">
              <WhatsAppBuyLink
                message={productMessage(product)}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-whatsapp px-6 text-[0.95rem] font-semibold text-whatsapp-ink shadow-[0_6px_16px_-8px_rgb(37_211_102/0.8)] transition-colors hover:bg-whatsapp-hover active:scale-[0.97]"
              >
                <WhatsAppIcon className="size-5" />
                {product.availability === "out-of-stock" ? "Ask about restock" : "Buy on WhatsApp"}
              </WhatsAppBuyLink>
              <div className="grid grid-cols-2 gap-2">
                <ButtonLink href={callHref} variant="outline" icon={<Phone />}>
                  Call
                </ButtonLink>
                {mail ? (
                  <ButtonLink href={mail} variant="outline" icon={<Mail />}>
                    Email
                  </ButtonLink>
                ) : (
                  <ButtonLink href={directionsHref} variant="outline" icon={<Navigation />}>
                    Directions
                  </ButtonLink>
                )}
              </div>
            </div>
            <ReferredByNote className="mt-3" />
            <TapEarnButton productId={product.id} title={title} category={product.category} variant="block" className="mt-4 border-t border-ice-200 pt-4" />
          </section>

          <div className="order-3">
            <OfferBox product={product} />
          </div>

          <section aria-labelledby="tips-title" className="order-5 rounded-xl border border-ice-200 bg-white p-5">
            <h2 id="tips-title" className="font-display text-base font-bold text-ink">
              Buying tips
            </h2>
            <ul className="mt-3 flex flex-col gap-3 text-sm text-ink-soft">
              <li className="flex gap-2.5">
                <WhatsAppIcon className="mt-0.5 size-4 shrink-0 text-gift" />
                Message us to confirm the price and that it&apos;s in stock today.
              </li>
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-royal-600" aria-hidden="true" />
                <span>
                  See and test it at either shop:{" "}
                  {business.branches.map((branch, index) => (
                    <span key={branch.id}>
                      {index > 0 ? " or " : null}
                      <a
                        href={directionsHrefFor(branch)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-royal-700 hover:underline"
                      >
                        {branch.address}
                      </a>{" "}
                      ({branch.landmark})
                    </span>
                  ))}
                  .
                </span>
              </li>
              <li className="flex gap-2.5">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-royal-600" aria-hidden="true" />
                {productWarranty ? <>This item comes with a {productWarranty.toLowerCase()}.</> : <>Ask us about the warranty on this item.</>}
              </li>
              {isSwappable(product) ? (
                <li className="flex gap-2.5">
                  <ArrowLeftRight className="mt-0.5 size-4 shrink-0 text-royal-600" aria-hidden="true" />
                  <span>
                    Have an old phone or laptop?{" "}
                    <Link href={`/swap?want=${product.id}`} className="font-semibold text-royal-700 hover:underline">
                      Swap it for this
                    </Link>
                    .
                  </span>
                </li>
              ) : null}
              {isInstallmentEligible(product) ? (
                <li className="flex gap-2.5">
                  <CalendarClock className="mt-0.5 size-4 shrink-0 text-royal-600" aria-hidden="true" />
                  <span>
                    Want to spread the cost?{" "}
                    <a
                      href={whatsappHref(whatsappMessages.installment)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-royal-700 hover:underline"
                    >
                      Ask about installment
                    </a>
                    .
                  </span>
                </li>
              ) : null}
            </ul>
          </section>
        </div>
      </div>

      {similar.length > 0 ? (
        <section aria-labelledby="similar-title" className="mt-10">
          <SectionHeader
            id="similar-title"
            title={`More ${category.shortLabel.toLowerCase()}`}
            action={{ href: `/shop/${category.slug}`, label: "See all" }}
          />
          <ProductGrid products={similar} className="mt-4" />
        </section>
      ) : null}

      <p className="mt-8 text-center text-sm text-ink-muted">
        Looking for something else?{" "}
        <Link href="/shop" className="font-semibold text-royal-700 hover:underline">
          Browse all products
        </Link>
      </p>
    </div>
  );
}
