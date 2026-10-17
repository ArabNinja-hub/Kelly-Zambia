import { ArrowUpRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories } from '../data/categories';
import type { Product } from '../data/products';
import { useCart } from '../lib/cart';
import { formatZMW } from '../lib/format';
import { BagIcon } from './BagIcon';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export function ProductCard({ product, compact = false }: ProductCardProps) {
  const { addItem } = useCart();
  const category = categories.find((item) => item.slug === product.category);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-card">
      <div className="relative overflow-hidden bg-[#f2f1ee]">
        <Link
          to={`/product/${product.slug}`}
          className="block aspect-square overflow-hidden rounded-t-xl"
          aria-label={`View ${product.name} details`}
        >
          <img
            src={product.image}
            alt={product.imageAlt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
          />
        </Link>

        <span className="pointer-events-none absolute left-3 top-3 rounded-full border border-ink/[0.08] bg-white/85 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-ink-muted backdrop-blur-sm">
          Demo product
        </span>

        <button
          type="button"
          onClick={() => addItem(product)}
          className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full border border-ink/10 bg-white text-ink shadow-sm transition-all duration-200 hover:bg-ink hover:text-white active:scale-95 sm:translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:focus-visible:translate-y-0 sm:focus-visible:opacity-100"
          aria-label={`Add ${product.name} to bag`}
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className={`flex flex-1 flex-col ${compact ? 'p-3.5' : 'p-4'}`}>
        <p className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
          {category?.shortName ?? 'Technology'}
        </p>
        <h3 className="mt-1.5 text-[13.5px] font-semibold leading-snug text-ink">
          <Link
            to={`/product/${product.slug}`}
            className="rounded-sm transition-colors hover:text-accent"
          >
            {product.name}
          </Link>
        </h3>
        {!compact ? (
          <p className="mt-1 line-clamp-1 text-[11.5px] text-ink-muted">{product.tagline}</p>
        ) : null}

        <div className="mt-3 flex items-end justify-between gap-2 pt-0.5">
          <div>
            <p className="font-display text-[15.5px] font-semibold tabular-nums tracking-[-0.01em] text-ink">
              {formatZMW(product.price)}
            </p>
            <p className="text-[9.5px] uppercase tracking-[0.08em] text-ink-muted">
              Illustrative price
            </p>
          </div>
          <Link
            to={`/product/${product.slug}`}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-line text-ink-muted transition-colors group-hover:border-ink/20 group-hover:text-accent"
            aria-label={`Open ${product.name} details`}
            tabIndex={-1}
          >
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white">
      <div className="aspect-square animate-pulse bg-mist" />
      <div className="space-y-2 p-4">
        <div className="h-2 w-14 animate-pulse rounded bg-mist" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-mist" />
        <div className="h-3 w-1/3 animate-pulse rounded bg-mist" />
      </div>
    </div>
  );
}

export function AddToBagButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  return (
    <button type="button" onClick={() => addItem(product)} className="btn-outline w-full">
      <BagIcon className="h-4 w-4" />
      Add to bag
    </button>
  );
}
