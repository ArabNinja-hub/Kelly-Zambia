import { ArrowUpRight, Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { formatZMW } from '../lib/format';
import { useOverlay } from '../lib/hooks';

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const panelRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  useOverlay(open, onClose, panelRef, inputRef);

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  if (!open) return null;

  const term = query.trim().toLowerCase();
  const matches = term
    ? products
        .filter((product) => {
          const categoryName = categories.find((category) => category.slug === product.category)?.name ?? '';
          return [product.name, product.tagline, product.description, categoryName]
            .join(' ')
            .toLowerCase()
            .includes(term);
        })
        .slice(0, 6)
    : products.filter((product) => product.featured).slice(0, 4);

  const suggestions = ['Headphones', 'Laptop', 'Smartwatch', 'Power bank'];

  function goToResults() {
    if (!term) return;
    onClose();
    navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-navy-950/45 backdrop-blur-[2px] animate-fade-in"
        aria-label="Close search"
        tabIndex={-1}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Search the demo catalogue"
        tabIndex={-1}
        className="relative mx-auto mt-[9vh] w-[min(92vw,640px)] overflow-hidden rounded-xl border border-white/10 bg-white shadow-panel animate-scale-in"
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            goToResults();
          }}
          className="flex items-center gap-3 border-b border-line px-5"
        >
          <Search className="h-4 w-4 shrink-0 text-ink-muted" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search phones, laptops, audio…"
            aria-label="Search products"
            className="h-14 w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-muted [&::-webkit-search-cancel-button]:hidden"
          />
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-ink-muted transition-colors hover:bg-mist hover:text-ink"
            aria-label="Close search"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </form>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          <p className="px-3 pb-1.5 pt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
            {term ? `Sample products matching “${query.trim()}”` : 'Featured sample products'}
          </p>

          {matches.length === 0 ? (
            <div className="px-3 py-8 text-center">
              <p className="font-display text-[17px] font-semibold text-ink">
                No sample products found
              </p>
              <p className="mx-auto mt-1.5 max-w-sm text-[12.5px] leading-relaxed text-ink-muted">
                Try a broader term, or browse a category below. This search only covers the demo
                catalogue.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setQuery(suggestion)}
                    className="rounded-full border border-line px-3 py-1.5 text-[11.5px] font-medium text-ink/70 transition-colors hover:border-ink/25 hover:text-ink"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <ul>
              {matches.map((product) => {
                const category = categories.find((item) => item.slug === product.category);
                return (
                  <li key={product.id}>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        navigate(`/product/${product.slug}`);
                      }}
                      className="flex w-full items-center gap-3.5 rounded-lg p-2.5 text-left transition-colors hover:bg-mist focus-visible:bg-mist"
                    >
                      <span className="h-12 w-12 shrink-0 overflow-hidden rounded-md border border-line/70 bg-mist">
                        <img
                          src={product.image}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-semibold text-ink">
                          {product.name}
                        </span>
                        <span className="mt-0.5 block truncate text-[11.5px] text-ink-muted">
                          {category?.name} · {product.tagline}
                        </span>
                      </span>
                      <span className="shrink-0 text-right">
                        <span className="block text-[12.5px] font-semibold tabular-nums text-ink">
                          {formatZMW(product.price)}
                        </span>
                        <span className="text-[9.5px] font-medium uppercase tracking-[0.1em] text-ink-muted">
                          Demo
                        </span>
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-ink/25" aria-hidden="true" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="mt-1 flex flex-wrap gap-1.5 border-t border-line/70 px-3 pb-2 pt-3">
            {categories.slice(0, 4).map((category) => (
              <button
                key={category.slug}
                type="button"
                onClick={() => {
                  onClose();
                  navigate(`/shop?category=${category.slug}`);
                }}
                className="rounded-full border border-line px-2.5 py-1 text-[10.5px] font-medium text-ink-muted transition-colors hover:border-ink/25 hover:text-ink"
              >
                {category.shortName}
              </button>
            ))}
            <span className="ml-auto self-center text-[10px] text-ink-muted">Esc to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
