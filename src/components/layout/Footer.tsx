import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';
import { DEMO_CONTENT, navLinks, site } from '../../data/site';
import { Logo } from '../Logo';

const contactRows = [
  { icon: Phone, ...site.contact.phone },
  { icon: MessageCircle, ...site.contact.whatsapp },
  { icon: Mail, ...site.contact.email },
  { icon: MapPin, ...site.contact.location },
];

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="container-page pb-10 pt-14 sm:pt-16">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_0.7fr_0.9fr_1.05fr] lg:gap-8">
          <div className="max-w-[320px]">
            <Logo variant="light" />
            <p className="mt-5 text-[12.5px] leading-relaxed text-white/60">
              A technology and electronics demo storefront for Kelly Zambia — designed to show how
              products, categories and customer enquiries could come together online.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              Demo website
            </p>
          </div>

          <div>
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="rounded-sm text-[12.5px] text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/shop"
                  className="rounded-sm text-[12.5px] text-white/60 transition-colors hover:text-white"
                >
                  All products
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
              Categories
            </h2>
            <ul className="mt-4 space-y-2.5">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    to={`/shop?category=${category.slug}`}
                    className="rounded-sm text-[12.5px] text-white/60 transition-colors hover:text-white"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
              Contact
            </h2>
            <ul className="mt-4 space-y-3.5">
              {contactRows.map((row) => (
                <li key={row.label} className="flex items-start gap-2.5">
                  <row.icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/60" aria-hidden="true" />
                  <span className="text-[11.5px] leading-snug text-white/55">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.08em] text-white/60">
                      {row.label}
                    </span>
                    <span className="mt-0.5 block">{row.value}</span>
                  </span>
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="mt-5 inline-flex items-center gap-1.5 rounded-sm text-[12px] font-semibold text-white transition-colors hover:text-accent-soft"
            >
              Send an enquiry
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <p className="mt-3 text-[10px] leading-relaxed text-white/60">{site.socialNote}</p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-[10.5px] text-white/60">
              © {new Date().getFullYear()} {site.name}. Demo website — not a live store.
            </p>
            <p className="max-w-xl text-[10px] leading-relaxed text-white/60 md:text-right">
              {DEMO_CONTENT
                ? 'Products, prices and service descriptions are illustrative samples. Contact details and business information are placeholders pending verified information.'
                : null}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
