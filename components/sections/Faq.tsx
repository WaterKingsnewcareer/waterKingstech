import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import type { Faq } from "@/data/faq";
import { cn } from "@/lib/cn";
import { faqJsonLd, jsonLdScriptProps } from "@/lib/structured-data";

/** Collapsible customer questions, with the same answers given to search engines as FAQ data. */
export function FaqList({ faqs, className }: { faqs: Faq[]; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-ice-200 bg-white", className)}>
      <script {...jsonLdScriptProps(faqJsonLd(faqs))} />
      <ul className="divide-y divide-ice-200">
        {faqs.map((faq) => (
          <li key={faq.question}>
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-ink transition-colors hover:text-royal-700 [&::-webkit-details-marker]:hidden">
                <h3 className="text-[0.95rem]">{faq.question}</h3>
                <ChevronDown
                  className="size-5 shrink-0 text-royal-600 transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <div className="-mt-1 px-5 pb-4 text-[0.92rem] text-ink-soft">
                <p className="max-w-3xl">{faq.answer}</p>
                {faq.link ? (
                  <Link
                    href={faq.link.href}
                    className="group/link mt-2 inline-flex items-center gap-1 text-sm font-semibold text-royal-700 hover:underline"
                  >
                    {faq.link.label}
                    <ArrowRight className="size-4 transition-transform group-hover/link:translate-x-0.5" aria-hidden="true" />
                  </Link>
                ) : null}
              </div>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
