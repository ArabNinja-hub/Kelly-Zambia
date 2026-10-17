import { MapPin, ShieldCheck } from 'lucide-react';

export function AnnouncementBar() {
  return (
    <div className="bg-navy-950 text-white">
      <div className="container-page flex h-9 items-center justify-between gap-4 text-[11px]">
        <p className="flex items-center gap-2 text-white/70">
          <MapPin className="h-3 w-3 text-accent" aria-hidden="true" />
          <span className="truncate">Your technology store in Zambia.</span>
        </p>
        <div className="flex items-center gap-5 text-[10.5px] text-white/60">
          <span className="hidden items-center gap-1.5 sm:flex">
            <ShieldCheck className="h-3 w-3" aria-hidden="true" />
            Demo website — sample products &amp; prices
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-white/30" aria-hidden="true" />
            Prices in ZMW
          </span>
        </div>
      </div>
    </div>
  );
}
