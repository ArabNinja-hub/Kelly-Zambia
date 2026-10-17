import { ArrowRight, Search, SlidersHorizontal, X } from 'lucide-react';
import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { DemoNote } from '../components/DemoNote';
import { PageHeader } from '../components/PageHeader';
import { ProductCard } from '../components/ProductCard';
import { Reveal } from '../components/Reveal';
import { categories, getCategory, isCategorySlug } from '../data/categories';
import { products } from '../data/products';
import { demoNotes } from '../data/site';
import { formatZMW } from '../lib/format';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name';

const sortLabels: Record<SortOption, string> = {
  featured: 'Featured first',
  'price-asc': 'Price: low to high',
  'price-desc': 'Price: high to low',
  name: 'Name: A to Z',
};

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawCategory = searchParams.get('category');
  const activeCategory = isCategorySlug(rawCategory) ? rawCategory : null;
  const query = searchParams.get('q') ?? '';
  const rawSort = searchParams.get('sort') as SortOption | null;
  const sort: SortOption = rawSort && rawSort in sortLabels ? rawSort : 'featured';

  function updateParams(next: Record<string, string | null>, replace = false) {
    const params = new URLSearchParams(searchParams);
    Object.entries(next).forEach(([key, value]) => {
      if (value === null || value === '') params.delete(key);
      else params.set(key, value);
    });
    setSearchParams(params, { replace });
  }

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    const list = products.filter((product) => {
      const matchesCategory = activeCategory ? product.category === activeCategory : true;
      if (!matchesCategory) return false;
      if (!term) return true;
      const categoryName = categories.find((category) => category.slug === product.category)?.name ?? '';
      return [product.name, product.tagline, product.description, categoryName]
        .join(' ')
        .toLowerCase()
        .includes(term);
    });

    const sorted = [...list];
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        sorted.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
    }
    return sorted;
  }, [activeCategory, query, sort]);

  const activeCategoryDetails = activeCategory ? getCategory(activeCategory) : undefined;
  const hasFilters = Boolean(activeCategory || query || rawSort);
  const priceMin = Math.min(...products.map((product) => product.price));
  const priceMax = Math.max(...products.map((product) => product.price));

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Shop' }]}
        eyebrow="Demo catalogue"
        title="Shop technology"
        description="Browse illustrative products across six proposed categories. Filter, search and open any product to see how the storefront experience could work."
        aside={
          <div className="rounded-lg border border-line bg-white px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
              Sample catalogue
            </p>
            <p className="mt-1 text-[13px] font-semibold text-ink">
              {products.length} demo products · {categories.length} categories
            </p>
          </div>
        }
      />

      <section className="bg-white py-8 sm:py-10">
        <div className="container-page">
          <div className="flex flex-col gap-3 border-b border-line pb-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-[340px]">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => updateParams({ q: event.target.value }, true)}
                placeholder="Search the demo catalogue…"
                aria-label="Search the demo catalogue"
                className="input py-2.5 pl-10 pr-9 text-[13px]"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => updateParams({ q: null })}
                  className="absolute right-2.5 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded text-ink-muted hover:bg-mist hover:text-ink"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              ) : null}
            </div>

            <div className="flex items-center justify-between gap-3 lg:justify-end">
              <p className="text-[11.5px] text-ink-muted" aria-live="polite">
                {filtered.length} of {products.length} sample products
              </p>
              <label className="flex items-center gap-2 text-[11.5px] text-ink-muted">
                <span className="sr-only">Sort products</span>
                <SlidersHorizontal className="h-3.5 w-3.5 text-ink-muted" aria-hidden="true" />
                <select
                  value={sort}
                  onChange={(event) => updateParams({ sort: event.target.value })}
                  className="rounded-md border border-line bg-white py-2 pl-2.5 pr-7 text-[12px] font-medium text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
                >
                  {(Object.keys(sortLabels) as SortOption[]).map((option) => (
                    <option key={option} value={option}>
                      {sortLabels[option]}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="mt-6 lg:grid lg:grid-cols-[216px_1fr] lg:gap-10">
            <aside className="hidden lg:block" aria-label="Product filters">
              <div className="sticky top-28">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                  Categories
                </p>
                <ul className="mt-3 space-y-0.5">
                  <li>
                    <button
                      type="button"
                      onClick={() => updateParams({ category: null })}
                      className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-[12.5px] transition-colors ${
                        !activeCategory
                          ? 'bg-ink text-white'
                          : 'text-ink/70 hover:bg-mist hover:text-ink'
                      }`}
                      aria-pressed={!activeCategory}
                    >
                      All products
                      <span
                        className={`text-[10.5px] tabular-nums ${
                          !activeCategory ? 'text-white/50' : 'text-ink-muted'
                        }`}
                      >
                        {products.length}
                      </span>
                    </button>
                  </li>
                  {categories.map((category) => {
                    const count = products.filter(
                      (product) => product.category === category.slug,
                    ).length;
                    const isActive = activeCategory === category.slug;
                    return (
                      <li key={category.slug}>
                        <button
                          type="button"
                          onClick={() => updateParams({ category: category.slug })}
                          className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-[12.5px] transition-colors ${
                            isActive
                              ? 'bg-ink text-white'
                              : 'text-ink/70 hover:bg-mist hover:text-ink'
                          }`}
                          aria-pressed={isActive}
                        >
                          {category.name}
                          <span
                            className={`text-[10.5px] tabular-nums ${
                              isActive ? 'text-white/50' : 'text-ink-muted'
                            }`}
                          >
                            {count}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-6 rounded-lg border border-line bg-paper p-3.5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                    Demo price range
                  </p>
                  <p className="mt-1.5 font-display text-[15px] font-semibold text-ink">
                    {formatZMW(priceMin)} – {formatZMW(priceMax)}
                  </p>
                  <p className="mt-1 text-[10.5px] leading-relaxed text-ink-muted">
                    Illustrative pricing only. A verified range would come from Kelly Zambia.
                  </p>
                </div>

                {hasFilters ? (
                  <button
                    type="button"
                    onClick={() => setSearchParams({})}
                    className="mt-4 inline-flex items-center gap-1.5 text-[11.5px] font-medium text-ink-muted transition-colors hover:text-accent"
                  >
                    <X className="h-3 w-3" aria-hidden="true" />
                    Clear all filters
                  </button>
                ) : null}
              </div>
            </aside>

            <div>
              <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 lg:hidden">
                <FilterPill
                  active={!activeCategory}
                  onClick={() => updateParams({ category: null })}
                  label="All"
                />
                {categories.map((category) => (
                  <FilterPill
                    key={category.slug}
                    active={activeCategory === category.slug}
                    onClick={() => updateParams({ category: category.slug })}
                    label={category.shortName}
                  />
                ))}
              </div>

              {activeCategoryDetails ? (
                <div className="mt-4 flex items-start justify-between gap-4 rounded-lg border border-line bg-paper px-4 py-3.5 lg:mt-0">
                  <div>
                    <h2 className="text-[13px] font-semibold text-ink">{activeCategoryDetails.name}</h2>
                    <p className="mt-0.5 text-[11.5px] leading-relaxed text-ink-muted">
                      {activeCategoryDetails.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => updateParams({ category: null })}
                    className="grid h-7 w-7 shrink-0 place-items-center rounded text-ink-muted transition-colors hover:bg-white hover:text-ink"
                    aria-label="Clear category filter"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              ) : null}

              {query ? (
                <p className="mt-4 text-[12px] text-ink-muted">
                  Results for <span className="font-semibold text-ink">“{query}”</span>
                  {activeCategoryDetails ? ` in ${activeCategoryDetails.name}` : ''}.
                </p>
              ) : null}

              {filtered.length > 0 ? (
                <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
                  {filtered.map((product, index) => (
                    <Reveal key={product.id} delay={Math.min(index, 5) * 35}>
                      <ProductCard product={product} />
                    </Reveal>
                  ))}
                </div>
              ) : (
                <div className="mt-6 flex flex-col items-center rounded-xl border border-dashed border-ink/15 bg-paper px-6 py-16 text-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-mist">
                    <Search className="h-5 w-5 text-ink-muted" aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 font-display text-[20px] font-semibold text-ink">
                    No sample products found
                  </h2>
                  <p className="mt-2 max-w-md text-[13px] leading-relaxed text-ink-muted">
                    Nothing in the illustrative catalogue matches
                    {query ? ` “${query}”` : ' these filters'}
                    {activeCategoryDetails ? ` in ${activeCategoryDetails.name}` : ''}. Try another
                    term or reset the filters.
                  </p>
                  <div className="mt-5 flex flex-wrap justify-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setSearchParams({})}
                      className="btn-dark btn-sm"
                    >
                      Clear filters
                    </button>
                    <Link to="/contact" className="btn-outline btn-sm">
                      Ask Kelly Zambia
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              )}

              <DemoNote className="mt-8" label="Illustrative catalogue">
                {demoNotes.product} {demoNotes.availability}
              </DemoNote>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FilterPill({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 rounded-full border px-3.5 py-2 text-[11.5px] font-medium transition-colors ${
        active
          ? 'border-ink bg-ink text-white'
          : 'border-line bg-white text-ink-muted hover:border-ink/25 hover:text-ink'
      }`}
    >
      {label}
    </button>
  );
}
