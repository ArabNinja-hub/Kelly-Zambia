import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { site } from '../data/site';

const rows = [
  { icon: Phone, ...site.contact.phone },
  { icon: MessageCircle, ...site.contact.whatsapp },
  { icon: Mail, ...site.contact.email },
  { icon: MapPin, ...site.contact.location },
];

export function ContactDetails({ columns = 2 }: { columns?: 1 | 2 }) {
  return (
    <ul className={`grid gap-3 ${columns === 2 ? 'sm:grid-cols-2' : ''}`}>
      {rows.map((row) => (
        <li key={row.label} className="rounded-lg border border-line bg-white p-4">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-mist text-ink-muted">
              <row.icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
              {row.label}
            </span>
          </div>
          <p className="mt-3 text-[13px] font-semibold leading-snug text-ink">{row.value}</p>
          <p className="mt-1 flex items-center gap-1.5 text-[10.5px] text-ink-muted">
            <span className="h-1 w-1 rounded-full bg-amber-400" aria-hidden="true" />
            {row.note}
          </p>
        </li>
      ))}
    </ul>
  );
}
