import { ArrowRight, ArrowUpRight, Layers, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DemoNote } from '../components/DemoNote';
import { PageHeader } from '../components/PageHeader';
import { Reveal } from '../components/Reveal';
import { categories } from '../data/categories';
import { getProductsByCategory } from '../data/products';
import { demoNotes } from '../data/site';
import { formatZMW } from '../lib/format';
import { useDocumentTitle } from '../lib/hooks';

export function CategoriesPage() {
  useDocumentTitle('Categories');

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Categories' }]}
        eyebrow="Category guide"
        title="Find the right starting point."
        description="Six proposed categories make the demo range easy to navigate — from the phone in your pocket to the accessories that keep everything running."
        aside={
          <Link to="/shop" className="btn-outline btn-sm">
            <Layers className="h-3.5 w-3.5" aria-hidden="true" />
            Browse all products
          </Link>
        }
      />

      <section className="bg-white py-12 sm:py-16">
        <div className="container-page">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => {
              const items = getProductsByCategory(category.slug);
              const from = items.length ? Math.min(...items.map((item) => item.price)) : 0;
              return (
                <Reveal key={category.slug} delay={(index % 3) * 50}>
                  <Link
                    to={`/shop?category=${category.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-card"
                  >
                    <div className="relative aspect-[5/4] overflow-hidden bg-[#f2f1ee]">
                      <img
                        src={category.image}
                        alt={category.imageAlt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                      />
                      <span className="absolute left-3 top-3 rounded-full border border-ink/[0.08] bg-white/85 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-ink-muted backdrop-blur-sm">
                        {items.length} sample {items.length === 1 ? 'product' : 'products'}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-start justify-between gap-3">
                        <h2 className="font-display text-[18px] font-semibold leading-tight tracking-[-0.02em] text-ink">
                          {category.name}
                        </h2>
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-ink-muted transition-all group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                      </div>
                      <p className="mt-2 text-[12.5px] leading-relaxed text-ink-muted">
                        {category.description}
                      </p>
                      <div className="mt-auto flex items-center justify-between border-t border-line/70 pt-4 text-[11px]">
                        <span className="text-ink-muted">
                          From{' '}
                          <span className="font-semibold tabular-nums text-ink/70">
                            {formatZMW(from)}
                          </span>
                        </span>
                        <span className="font-semibold uppercase tracking-[0.1em] text-ink-muted transition-colors group-hover:text-accent">
                          Explore
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <DemoNote className="mt-7" label="Proposed categories">
            {demoNotes.categories} Prices shown are illustrative and not verified business pricing.
          </DemoNote>

          <div className="mt-10 overflow-hidden rounded-xl border border-line bg-paper">
            <div className="grid items-center gap-6 p-6 sm:p-9 md:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="eyebrow">Not sure where to start?</p>
                <h2 className="mt-3 max-w-md font-display text-[24px] font-semibold leading-tight tracking-[-0.03em] text-ink sm:text-[28px]">
                  Ask a question and let the conversation guide you.
                </h2>
                <p className="mt-2.5 max-w-md text-[13px] leading-relaxed text-ink-muted">
                  In a live version of this site, an enquiry would reach Kelly Zambia directly. In
                  the demo, the form simply shows how that path could work.
                </p>
              </div>
              <div className="flex flex-col gap-2.5 sm:flex-row md:justify-end">
                <Link to="/contact" className="btn-dark btn-sm">
                  <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                  Contact Kelly Zambia
                </Link>
                <Link to="/shop" className="btn-outline btn-sm">
                  Browse all products
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
