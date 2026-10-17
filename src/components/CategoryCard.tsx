import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Category } from '../data/categories';
import { getProductsByCategory } from '../data/products';

interface CategoryCardProps {
  category: Category;
  index?: number;
  variant?: 'default' | 'tall';
}

export function CategoryCard({ category, variant = 'default' }: CategoryCardProps) {
  const count = getProductsByCategory(category.slug).length;

  return (
    <Link
      to={`/shop?category=${category.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-card"
    >
      <div className={`relative overflow-hidden bg-[#f2f1ee] ${variant === 'tall' ? 'aspect-[5/4]' : 'aspect-[4/3]'}`}>
        <img
          src={category.image}
          alt={category.imageAlt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-ink/10 bg-white/85 text-ink/70 backdrop-blur-sm transition-all duration-300 group-hover:bg-ink group-hover:text-white">
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </div>
      <div className="flex flex-1 items-center justify-between gap-3 px-4 py-4">
        <div>
          <h3 className="text-[13.5px] font-semibold leading-tight text-ink">{category.name}</h3>
          <p className="mt-1 text-[11px] text-ink-muted">
            {count} sample {count === 1 ? 'product' : 'products'}
          </p>
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/25 transition-colors group-hover:text-accent">
          Browse
        </span>
      </div>
    </Link>
  );
}
