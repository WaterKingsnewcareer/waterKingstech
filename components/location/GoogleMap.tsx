import { business } from "@/data/business";
import type { Branch } from "@/types";

/** Exact pin or embed link if supplied; otherwise the branch's address. */
function embedSrc(branch: Branch): string {
  const { mapEmbedUrl, coordinates, mapQuery } = branch;
  if (mapEmbedUrl) return mapEmbedUrl;
  if (coordinates) return `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=17&output=embed`;
  return `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=17&output=embed`;
}

/** Live embedded Google Map of one branch, lazy-loaded so it never slows down the first paint. */
export function GoogleMap({ branch, className }: { branch: Branch; className?: string }) {
  return (
    <div className={className}>
      <iframe
        src={embedSrc(branch)}
        title={`Map showing ${business.name}, ${branch.name} — ${branch.address}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="size-full border-0"
      />
    </div>
  );
}
