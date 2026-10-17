import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Grid2X2,
  Info,
  MessageCircle,
  MousePointerClick,
  Quote,
  ShieldCheck,
  Wallet,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CategoryCard } from '../components/CategoryCard';
import { ContactDetails } from '../components/ContactDetails';
import { DemoNote } from '../components/DemoNote';
import { EnquiryForm } from '../components/EnquiryForm';
import { ProductCard } from '../components/ProductCard';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { demoNotes, serviceHighlights } from '../data/site';
import { assetUrl } from '../lib/format';

const featured = products.filter((product) => product.featured).slice(0, 8);

const serviceIcons = {
  discover: Grid2X2,
  guidance: MousePointerClick,
  enquiry: MessageCircle,
  local: Wallet,
} as const;

const editorialLinks = [
  {
    label: 'Laptops & computers',
    note: 'Work, study and creative projects',
    href: '/shop?category=laptops',
    image: assetUrl('/images/products/laptop-graphite.webp'),
  },
  {
    label: 'Audio & headphones',
    note: 'Sound for focus and downtime',
    href: '/shop?category=audio',
    image: assetUrl('/images/products/headphones.webp'),
  },
  {
    label: 'Accessories',
    note: 'The extras that keep devices ready',
    href: '/shop?category=accessories',
    image: assetUrl('/images/products/accessories.webp'),
  },
];

export function HomePage() {
  return (
    <>
      {/* ============================= HERO ============================= */}
      <section className="relative overflow-hidden border-b border-line/80 bg-canvas">
        <div
          className="pointer-events-none absolute inset-0 bg-grid-soft opacity-[0.5] [mask-image:linear-gradient(to_right,black,transparent_70%)]"
          aria-hidden="true"
        />
        <div className="container-page relative">
          <div className="grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[1.02fr_1fr] lg:gap-14 lg:py-[72px]">
            <div className="max-w-[560px]">
              <p className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                Technology &amp; electronics · Zambia
              </p>

              <h1 className="mt-6 font-display text-[42px] font-semibold leading-[0.98] tracking-[-0.045em] text-ink sm:text-[56px] lg:text-[62px]">
                Technology for
                <br className="hidden sm:block" /> the way you{' '}
                <span className="relative whitespace-nowrap">
                  live
                  <span className="text-accent">.</span>
                  <svg
                    viewBox="0 0 200 12"
                    preserveAspectRatio="none"
                    className="absolute -bottom-1.5 left-0 h-2 w-full text-accent/25"
                    aria-hidden="true"
                  >
                    <path d="M2 9c48-6 106-8 196-4" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>

              <p className="mt-6 max-w-[470px] text-[15px] leading-relaxed text-ink/70 sm:text-[16px]">
                Explore technology and electronics designed to keep you connected, productive, and
                ready for what's next.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/shop" className="btn-primary h-12 px-6">
                  Explore products
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link to="/contact" className="btn-outline h-12 px-6">
                  Contact Kelly Zambia
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
                {[
                  { icon: Grid2X2, label: 'Six categories to browse' },
                  { icon: MessageCircle, label: 'Direct enquiries' },
                  { icon: Wallet, label: 'Prices shown in ZMW' },
                ].map((item) => (
                  <span key={item.label} className="flex items-center gap-2 text-[11.5px] text-ink-muted">
                    <item.icon className="h-3.5 w-3.5 text-ink-muted" aria-hidden="true" />
                    {item.label}
                  </span>
                ))}
              </div>

              <p className="mt-5 flex items-center gap-1.5 text-[10.5px] text-ink-muted">
                <Info className="h-3 w-3" aria-hidden="true" />
                Illustrative demo storefront — sample products and prices.
              </p>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-xl border border-ink/10 bg-[#eeece8] shadow-[0_40px_80px_-48px_rgba(10,27,46,0.45)]">
                <img
                  src={assetUrl('/images/hero-devices.webp')}
                  alt="Laptop, smartphone, wireless headphones and smartwatch arranged on a light studio platform"
                  width={1600}
                  height={893}
                  fetchPriority="high"
                  className="aspect-[4/3] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/3]"
                />

                <div className="absolute inset-x-3 bottom-3 rounded-lg border border-white/60 bg-white/90 p-2 backdrop-blur-md sm:inset-x-4 sm:bottom-4 sm:p-2.5">
                  <div className="grid grid-cols-3 divide-x divide-line/80">
                    {[
                      { label: 'Phones', category: 'smartphones' },
                      { label: 'Laptops', category: 'laptops' },
                      { label: 'Audio', category: 'audio' },
                    ].map((item) => (
                      <Link
                        key={item.category}
                        to={`/shop?category=${item.category}`}
                        className="group flex items-center justify-between gap-1 px-3 py-1.5 text-[11.5px] font-semibold text-ink transition-colors first:pl-1.5 last:pr-1.5 hover:text-accent"
                      >
                        {item.label}
                        <ArrowUpRight
                          className="h-3 w-3 text-ink/25 transition-colors group-hover:text-accent"
                          aria-hidden="true"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </section>

      {/* ========================= CATEGORIES ========================= */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Browse the range"
              title="Shop by category"
              description="A clear starting point for exploring phones, computers, audio, wearables and the accessories around them."
              action={
                <Link to="/categories" className="link-underline">
                  All categories
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              }
            />
          </Reveal>

          <div className="mt-9 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {categories.map((category, index) => (
              <Reveal key={category.slug} delay={index * 40}>
                <CategoryCard category={category} />
              </Reveal>
            ))}
          </div>

          <DemoNote className="mt-6" label="Demo categories">
            {demoNotes.categories}
          </DemoNote>
        </div>
      </section>

      {/* ====================== FEATURED PRODUCTS ====================== */}
      <section className="border-y border-line/70 bg-paper py-16 sm:py-20">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Featured selection"
              title="Technology worth a closer look"
              description="Sample products chosen to show how a curated technology range could be presented — complete with details and a working demo bag."
              action={
                <Link to="/shop" className="link-underline">
                  View all products
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              }
            />
          </Reveal>

          <div className="mt-9 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {featured.map((product, index) => (
              <Reveal key={product.id} delay={(index % 4) * 45}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <DemoNote className="max-w-2xl" label="Illustrative data">
              {demoNotes.product}
            </DemoNote>
            <Link to="/shop" className="btn-dark btn-sm shrink-0">
              Browse the demo catalogue
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ======================== EDITORIAL ======================== */}
      <section className="relative overflow-hidden bg-navy-950 py-16 text-white sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-grid-soft opacity-[0.16] invert" aria-hidden="true" />
        <div className="container-page relative">
          <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow text-accent-soft before:bg-white/30">The everyday toolkit</p>
              <h2 className="mt-5 max-w-lg font-display text-[32px] font-semibold leading-[1.04] tracking-[-0.04em] sm:text-[42px]">
                Built around the way you work, listen and move.
              </h2>
              <p className="mt-4 max-w-md text-[14px] leading-relaxed text-white/50 sm:text-[15px]">
                From a desk set-up that keeps you productive to headphones that make space for
                focus, the range is arranged around real routines — not just specifications.
              </p>

              <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
                {editorialLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="group flex items-center justify-between gap-4 py-4 transition-colors hover:text-white"
                    >
                      <span>
                        <span className="block text-[14px] font-semibold text-white">{item.label}</span>
                        <span className="mt-1 block text-[11.5px] text-white/60">{item.note}</span>
                      </span>
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 text-white/60 transition-all group-hover:border-white/40 group-hover:bg-white group-hover:text-ink">
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <Link to="/shop" className="btn mt-8 h-12 bg-white px-6 text-ink hover:bg-white/90">
                Explore the collection
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>

            <Reveal delay={80} className="relative">
              <div className="grid grid-cols-[1.15fr_0.85fr] gap-3 sm:gap-4">
                <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                  <img
                    src={assetUrl('/images/editorial-audio.webp')}
                    alt="Headphones and a smartwatch arranged on sculptural display platforms"
                    loading="lazy"
                    className="h-full min-h-[280px] w-full object-cover sm:min-h-[420px]"
                  />
                </div>
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                    <img
                      src={assetUrl('/images/products/laptop-graphite.webp')}
                      alt="Graphite laptop open on a light desk"
                      loading="lazy"
                      className="aspect-square w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between rounded-xl border border-white/10 bg-white/[0.04] p-4">
                    <Quote className="h-5 w-5 text-white/60" aria-hidden="true" />
                    <div className="mt-4">
                      <p className="text-[12px] leading-relaxed text-white/60">
                        A storefront that helps customers picture the products in their own
                        routines.
                      </p>
                      <p className="mt-2.5 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white/60">
                        Demo design note
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-[10.5px] text-white/60">
                Editorial imagery for demonstration purposes. Not a product claim or offer.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ========================== WHY KELLY ========================== */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <p className="eyebrow">Why shop with Kelly Zambia</p>
                <h2 className="mt-4 max-w-md font-display text-[30px] font-semibold leading-[1.06] tracking-[-0.035em] text-ink sm:text-[38px]">
                  A calmer way to shop for technology.
                </h2>
                <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-ink-muted">
                  The experience is designed to make product discovery straightforward, answer
                  questions early and keep the next step simple.
                </p>
                <DemoNote className="mt-6 max-w-sm" label="Proposed content">
                  {demoNotes.service}
                </DemoNote>
              </div>
            </Reveal>

            <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {serviceHighlights.map((item, index) => {
                const Icon = serviceIcons[item.icon];
                return (
                  <Reveal key={item.title} delay={index * 50}>
                    <div className="h-full border-t border-line py-6">
                      <span className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-mist text-ink">
                        <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                      </span>
                      <h3 className="mt-4 text-[14px] font-semibold text-ink">{item.title}</h3>
                      <p className="mt-2 text-[12.5px] leading-relaxed text-ink-muted">
                        {item.description}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================ ABOUT ============================ */}
      <section className="border-y border-line/70 bg-paper py-16 sm:py-20">
        <div className="container-page">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal className="order-2 lg:order-1">
              <div className="relative overflow-hidden rounded-xl border border-ink/10">
                <img
                  src={assetUrl('/images/about-range.webp')}
                  alt="Power bank, cable, charger and phone case arranged on a light studio surface"
                  loading="lazy"
                  className="aspect-[5/4] w-full object-cover"
                />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-md border border-white/60 bg-white/90 px-3 py-2 backdrop-blur-sm">
                  <BadgeCheck className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ink/70">
                    Demo presentation
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal className="order-1 lg:order-2">
              <p className="eyebrow">About Kelly Zambia</p>
              <h2 className="mt-4 font-display text-[30px] font-semibold leading-[1.07] tracking-[-0.035em] text-ink sm:text-[38px]">
                A local technology store, presented online.
              </h2>
              <p className="mt-4 text-[14px] leading-relaxed text-ink-muted">
                Kelly Zambia is presented in this demo as a technology and electronics retailer
                serving customers in Zambia. This website concept shows how its range could be
                organised, explored and discussed online.
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">
                No company history, branch details or achievements are stated here — those details
                would be added only once confirmed by the business.
              </p>

              <ul className="mt-6 space-y-2.5">
                {[
                  'A structured way to browse and compare technology',
                  'Product pages that keep the essentials in view',
                  'A simple route from interest to a conversation',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[13px] text-ink/70">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link to="/about" className="btn-dark btn-sm">
                  More about this demo
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
                <Link to="/shop" className="link-underline">
                  Browse products
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>

              <DemoNote className="mt-6" label="Demo note">
                {demoNotes.about}
              </DemoNote>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =========================== CONTACT =========================== */}
      <section id="enquiry" className="bg-mist/60 py-16 sm:py-20">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <Reveal>
              <p className="eyebrow">Enquiries</p>
              <h2 className="mt-4 max-w-md font-display text-[30px] font-semibold leading-[1.07] tracking-[-0.035em] text-ink sm:text-[38px]">
                Have a question? Start a conversation.
              </h2>
              <p className="mt-4 max-w-md text-[14px] leading-relaxed text-ink-muted">
                Use the demo enquiry form to see how a customer could ask about a product, confirm
                details or get guidance. In a live website these messages would reach Kelly Zambia
                directly.
              </p>

              <ContactDetails />

              <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-ink/10 bg-white/70 px-3.5 py-3">
                <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-muted" aria-hidden="true" />
                <p className="text-[11px] leading-relaxed text-ink-muted">
                  Contact details above are placeholders pending verified business information.
                  Opening hours and social profiles should be added only when confirmed.
                </p>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <EnquiryForm compact />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
