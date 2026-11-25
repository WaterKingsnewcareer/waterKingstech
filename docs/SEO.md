# WaterKingsTech — SEO report

Audit and implementation, 24 November 2026. Live site: **https://www.waterkingstech.com**
(`waterkingstech.com` and `waterkingstech.vercel.app` both redirect there).

No ranking is guaranteed: position depends on competition, links, reviews and Google's
own systems. This work gives the site the strongest honest technical and on-page
foundation; the owner actions at the end are what move rankings from here.

---

## 1. Audit — what was found

| Area | Finding | Severity |
| --- | --- | --- |
| Site URL | `NEXT_PUBLIC_SITE_URL` was never set, so production fell back to `http://localhost:3000`. **robots.txt, the sitemap and every canonical tag pointed Google at localhost.** | Critical |
| Duplicate host | `waterkingstech.vercel.app` served the full site (200) alongside the real domain. | High |
| Social cards | Inner pages inherited the home page's Open Graph / X title and `og:url: /`, so every shared link looked like the home page. | High |
| Structured data | Only one ElectronicsStore block. No WebSite, BreadcrumbList, Service or FAQ data. | Medium |
| Sample catalog | Products are placeholder stock (`catalogIsSample`), yet product pages were indexable with sample prices. | Medium |
| Headings | One H1 per page (good), but several were vague ("What are you looking for?", "UK Used", "Corporate portal"). | Low |
| robots.txt | Non-standard `Host:` line with the localhost URL. | Low |
| 404 page | Sent both `noindex` and `index, follow`. | Low |

Already sound: Next.js 16 App Router with static pre-rendering (fast, fully crawlable HTML),
`next/image` with AVIF/WebP and sizes, `lang="en-GH"`, a single H1 per page,
self-referencing canonicals that ignore filter query strings, a 308 for trailing slashes,
mobile-first layout, and no analytics scripts slowing the page.

## 2. What was implemented

**Technical**
- `lib/site.ts` — production URL `https://www.waterkingstech.com` (overridable with `NEXT_PUBLIC_SITE_URL`).
- `next.config.ts` — permanent (308) redirect from `waterkingstech.vercel.app/*` to the same path on the real domain, in one hop.
- `app/robots.ts` — everything crawlable; absolute sitemap URL; the `Host:` line removed.
- `app/sitemap.ts` — 14 canonical, indexable pages with absolute HTTPS URLs. Product pages join automatically once the real catalog is in.
- Search Console / Bing verification: set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` / `NEXT_PUBLIC_BING_SITE_VERIFICATION` in Vercel (or verify by DNS instead).

**Metadata** — `lib/seo.ts` `pageMetadata()` gives every page one consistent set: title, description, canonical, Open Graph and X/Twitter card, and robots where needed. Titles are about 60–69 characters with the brand last; descriptions are 135–160 characters.

**Indexability**
- Sample product pages are `noindex, follow` and kept out of the sitemap, so placeholder prices never appear in Google. Setting `catalogIsSample = false` in `data/products.ts` makes them indexable, adds them to the sitemap and switches on Product data. It does all three at once.
- The 404 page is `noindex` with its own title.

**Structured data** (`lib/structured-data.ts`) — every value comes from `/data`; missing facts are left out, never guessed:
- Every page: `WebSite` and `ElectronicsStore` (address, phone, email, 24/7 hours, logo, areas served, alternate names "Water Kings Tech" / "WaterKings Tech").
- Every page with breadcrumbs: `BreadcrumbList`.
- `/repairs`: an `ItemList` of `Service` items, one per repair.
- Home: `FAQPage`, matching the visible FAQ.
- Product pages: a `Product` and `Offer` (GHS price, condition, availability), switched on with the real catalog.

**Content**
- A "Questions customers ask" FAQ on the home page (`data/faq.ts`). It answers location, 24/7 hours, UK used vs brand new, installment, repairs, swaps, gifts, how to buy and bulk orders. Every answer is built from confirmed data and links to the relevant page, which also strengthens internal linking.
- Clearer H1s: "Phone & laptop repairs in Accra", "UK used phones & laptops", "Visit our shops in Circle & Tse Addo", and others. On the home page, the descriptive sentence is now the H1; the visual design is unchanged.

## 3. Keyword strategy

No search-volume tool was used, so the clusters below are **strategic hypotheses** built from
the shop's real offer and how Ghanaian buyers phrase searches. Validate them in Google
Search Console (Performance → Queries) after 4–8 weeks and adjust copy toward the queries
that already show impressions.

| Cluster | Example queries (hypotheses) | Intent | Target page |
| --- | --- | --- | --- |
| Brand | WaterKingsTech, Water Kings Tech, WaterKingsTech Accra | Navigational | `/` |
| Local shop | phone shop Circle Accra, phone shop Tse Addo, laptop shop Accra, phone shop open 24 hours Accra | Local / transactional | `/visit`, `/` |
| UK used | UK used iPhone Accra, UK used laptops Ghana, UK used MacBook Accra | Transactional | `/uk-used`, `/shop/phones`, `/shop/laptops` |
| Brand new | brand new iPhone Accra, sealed laptops Accra | Transactional | `/brand-new` |
| Phones | iPhone for sale Accra, Samsung Galaxy Accra | Commercial | `/shop/phones` |
| Laptops | HP / Dell / Lenovo laptop Accra, MacBook price Ghana | Commercial | `/shop/laptops` |
| Accessories | SSD Accra, laptop charger Accra, earbuds Accra | Transactional | `/shop/accessories` |
| Installment | buy phone on installment Ghana, iPhone installment Accra, MacBook installment Accra | Transactional | `/referral-installment` |
| Repairs | phone repair Accra, laptop repair Accra, iPhone screen replacement Accra, laptop SSD upgrade Accra, RAM upgrade Accra, 24 hour phone repair Accra | Service / local | `/repairs` |
| Swap | swap iPhone Accra, trade in phone Ghana | Transactional | `/swap` |
| Deals | laptop deals Accra, free laptop bag | Commercial | `/deals` |
| Business | bulk laptops Ghana, laptops for schools Ghana | B2B | `/corporate` |
| Questions | where is WaterKingsTech, is WaterKingsTech open 24 hours, can I buy a phone on installment in Accra | Informational | Home FAQ |

**Deliberately not targeted:** Tema and other towns. Nothing confirms the shop serves or
delivers there, and claiming it would be misleading. Add those areas if the owner confirms
delivery or a branch.

## 4. Owner actions — these move rankings now

1. **Google Search Console** — add the domain property `waterkingstech.com` (DNS verification), submit `https://www.waterkingstech.com/sitemap.xml`, then use URL Inspection → Request indexing on the home, `/repairs`, `/visit` and the category pages.
2. **Google Business Profile** — the Tse Addo profile exists; create one for the Circle branch too. Add the website `https://www.waterkingstech.com`, the shop photos, the products and services (repairs list), and finish verification so the listing appears publicly in Maps. Then send the Maps **Share** link so the site's map pins the exact shop.
3. **Reviews** — ask every buyer for a Google review with the profile's "Ask for reviews" link. Reviews are the strongest local ranking signal; the site's verified-reviews section is ready for them.
4. **Real catalog** — replace sample products with real stock, prices and photos, then set `catalogIsSample = false`. Product pages then become indexable and eligible for rich results.
5. **Consistent name, address and phone everywhere** — use the same name, addresses and phone (WaterKingsTech — Circle Mall, Tip Toe Lane and Rosewood Street, Tse Addo, Accra; 054 260 9094) on Facebook, Instagram, Jiji, Tonaton and Ghanaian business directories, each linking to the website. Then send the social links so they appear in `data/contact.ts` (the schema's `sameAs`).
6. **Shop photos** — add real photos of both shops to the Google Business Profile; they help Google's trust signals. (The website no longer shows a shop-photo section.)
