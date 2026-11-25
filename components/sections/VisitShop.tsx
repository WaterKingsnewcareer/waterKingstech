import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { GoogleMap } from "@/components/location/GoogleMap";
import { ButtonLink } from "@/components/ui/Button";
import { Pending } from "@/components/ui/Pending";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { business } from "@/data/business";
import { contact } from "@/data/contact";
import { cn } from "@/lib/cn";
import { callHref, directionsHrefFor, emailHref, whatsappHref, whatsappMessages } from "@/lib/contact-links";

/** Both branches with a live map and directions each, then the shared contact details. */
export function VisitShop({ className }: { className?: string }) {
  const { branches, openingHours } = business;
  const mail = emailHref();

  return (
    <div id="branches" className={cn("flex scroll-mt-32 flex-col gap-3", className)}>
      <ul className={cn("grid gap-3", branches.length > 1 && "md:grid-cols-2")}>
        {branches.map((branch) => (
          <li key={branch.id} className="flex flex-col overflow-hidden rounded-xl border border-ice-200 bg-white">
            <div className="relative">
              <GoogleMap branch={branch} className="aspect-[16/10] bg-ice-100" />
              <p className="pointer-events-none absolute top-3 left-3 rounded-lg bg-white/95 px-3 py-1.5 text-[0.8rem] font-bold text-royal-700 shadow-[0_8px_20px_-10px_rgb(3_26_61/0.5)]">
                {branch.name}
              </p>
            </div>
            <div className="flex flex-1 flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex gap-3">
                <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-royal-50 text-royal-600">
                  <MapPin className="size-5" />
                </span>
                <p className="text-[0.92rem] leading-snug text-ink-soft">
                  <span className="block font-semibold text-ink">{branch.address}</span>
                  <span className="block">
                    {branch.landmark}, {branch.city}
                  </span>
                </p>
              </div>
              <ButtonLink href={directionsHrefFor(branch)} variant="primary" icon={<Navigation />} className="shrink-0">
                Get directions
              </ButtonLink>
            </div>
          </li>
        ))}
      </ul>

      <div className="grid gap-4 rounded-xl border border-ice-200 bg-white p-5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-center">
        <Row icon={<WhatsAppIcon className="size-5" />} label="Call or WhatsApp">
          <span className="flex flex-wrap gap-x-3">
            {contact.whatsapp.map((w) => (
              <a
                key={w.number}
                href={whatsappHref(whatsappMessages.visit, w.number)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold whitespace-nowrap text-ink hover:text-royal-700 hover:underline"
              >
                {w.display}
              </a>
            ))}
          </span>
        </Row>
        {mail ? (
          <Row icon={<Mail className="size-5" />} label="Email">
            <a href={mail} className="font-semibold break-all text-ink hover:text-royal-700 hover:underline">
              {contact.email}
            </a>
          </Row>
        ) : null}
        <Row icon={<Clock className="size-5" />} label="Opening hours">
          {openingHours ? (
            openingHours.map((row) => (
              <span key={row.days} className="block">
                {row.days}: <span className="font-semibold text-ink">{row.hours}</span>
              </span>
            ))
          ) : (
            <Pending>Opening hours to be supplied</Pending>
          )}
        </Row>
        <div className="grid grid-cols-2 gap-2 sm:col-span-2 lg:col-span-1">
          <ButtonLink href={whatsappHref(whatsappMessages.visit)} variant="whatsapp" icon={<WhatsAppIcon />}>
            WhatsApp
          </ButtonLink>
          <ButtonLink href={callHref} variant="outline" icon={<Phone />}>
            Call
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

function Row({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-3">
      <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-royal-50 text-royal-600">
        {icon}
      </span>
      <div className="min-w-0 text-[0.92rem] text-ink-soft">
        <p className="text-[0.75rem] font-semibold text-ink-muted">{label}</p>
        <div className="mt-0.5">{children}</div>
      </div>
    </div>
  );
}
