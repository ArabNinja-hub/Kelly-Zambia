import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Info,
  MessageCircle,
  Package,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BagIcon } from '../components/BagIcon';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { DemoNote } from '../components/DemoNote';
import { ProductCard } from '../components/ProductCard';
import { QuantityStepper } from '../components/QuantityStepper';
import { Reveal } from '../components/Reveal';
import { categories } from '../data/categories';
import { getProduct, getRelatedProducts } from '../data/products';
import { demoNotes } from '../data/site';
import { useCart } from '../lib/cart';
import { useDocumentTitle } from '../lib/hooks';
import { formatZMW } from '../lib/format';

const availabilityRows = [
  { icon: Package, label: 'Availability', value: 'To be confirmed' },
  { icon: ShieldCheck, label: 'Warranty', value: 'To be confirmed' },
  { icon: Truck, label: 'Delivery & collection', value: 'To be confirmed' },
];

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProduct(slug) : undefined;
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  useDocumentTitle(product ? product.name : 'Product not found');

  useEffect(() => {
    setQuantity(1);
  }, [slug]);

  if (!product) {
    return (
      <section className="container-page py-24 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-mist">
          <Package className="h-5 w-5 text-ink-muted" aria-hidden="true" />
        </span>
        <h1 className="mt-6 font-display text-[30px] font-semibold tracking-[-0.03em] text-ink">
          This sample product isn’t here
        </h1>
        <p className="mx-auto mt-3 max-w-md text-[13.5px] leading-relaxed text-ink-muted">
          The product you followed may have been removed from the demo catalogue. Browse the
          illustrative range to keep exploring.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2.5">
          <Link to="/shop" className="btn-primary">
            Browse products
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link to="/" className="btn-outline">
            Back home
          </Link>
        </div>
      </section>
    );
  }

  const category = categories.find((item) => item.slug === product.category);
  const related = getRelatedProducts(product, 4);

  return (
    <>
      <section className="border-b border-line bg-paper">
        <div className="container-page py-5">
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Shop', to: '/shop' },
              ...(category
                ? [{ label: category.name, to: `/shop?category=${category.slug}` }]
                : []),
              { label: product.name },
            ]}
          />
        </div>
      </section>

      <section className="bg-white py-8 sm:py-12">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[1.02fr_1fr] lg:gap-14">
            <div>
              <div className="relative overflow-hidden rounded-xl border border-line bg-[#f2f1ee]">
                <img
                  src={product.image}
                  alt={product.imageAlt}
                  width={900}
                  height={900}
                  className="aspect-square w-full object-cover"
                />
                <span className="absolute left-4 top-4 rounded-full border border-ink/10 bg-white/90 px-2.5 py-1 text-[9.5px] font-semibold uppercase tracking-[0.12em] text-ink-muted backdrop-blur-sm">
                  Illustrative demo image
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 min-[400px]:grid-cols-3">
                {availabilityRows.map((row) => (
                  <div key={row.label} className="rounded-lg border border-line bg-paper px-3 py-3">
                    <row.icon className="h-4 w-4 text-ink-muted" aria-hidden="true" />
                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-muted">
                      {row.label}
                    </p>
                    <p className="mt-0.5 text-[11.5px] font-medium text-ink/65">{row.value}</p>
                  </div>
                ))}
              </div>
              <p className="mt-2.5 flex items-start gap-1.5 text-[10.5px] leading-relaxed text-ink-muted">
                <Info className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
                Availability, warranty and delivery details would be confirmed by Kelly Zambia before
                launch.
              </p>
            </div>

            <div className="max-w-xl">
              {category ? (
                <Link
                  to={`/shop?category=${category.slug}`}
                  className="inline-flex items-center gap-1 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-accent transition-colors hover:text-accent-dark"
                >
                  {category.name}
                  <ChevronRight className="h-3 w-3" aria-hidden="true" />
                </Link>
              ) : null}

              <h1 className="mt-3 font-display text-[34px] font-semibold leading-[1.03] tracking-[-0.04em] text-ink sm:text-[42px]">
                {product.name}
              </h1>
              <p className="mt-2.5 text-[13px] text-ink-muted">{product.tagline}</p>

              <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <p className="font-display text-[30px] font-semibold tabular-nums tracking-[-0.03em] text-ink">
                  {formatZMW(product.price)}
                </p>
                <p className="text-[11px] text-ink-muted">ZMW · illustrative demo price</p>
              </div>

              <DemoNote className="mt-5" label="Sample product">
                {demoNotes.product}
              </DemoNote>

              <p className="mt-6 text-[13.5px] leading-relaxed text-ink/70">{product.description}</p>

              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {product.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2 text-[12px] leading-relaxed text-ink/65">
                    <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                      <Check className="h-2.5 w-2.5" aria-hidden="true" strokeWidth={3} />
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-medium text-ink-muted">Quantity</span>
                  <QuantityStepper
                    value={quantity}
                    onChange={(next) => setQuantity(Math.min(99, Math.max(1, next)))}
                    label={product.name}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => addItem(product, quantity)}
                  className="btn-primary flex-1"
                >
                  <BagIcon className="h-4 w-4" />
                  Add to bag
                </button>
              </div>

              <Link
                to={`/contact?product=${encodeURIComponent(product.name)}`}
                className="btn-outline mt-3 w-full"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Enquire about this product
              </Link>

              <div className="mt-6 grid gap-4 border-t border-line pt-6 sm:grid-cols-2">
                <div className="flex items-start gap-2.5">
                  <Truck className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" aria-hidden="true" />
                  <div>
                    <p className="text-[11.5px] font-semibold text-ink">Delivery options</p>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-ink-muted">
                      To be confirmed with the business.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" aria-hidden="true" />
                  <div>
                    <p className="text-[11.5px] font-semibold text-ink">Warranty</p>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-ink-muted">
                      Not claimed in this demo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-10 border-t border-line pt-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="eyebrow">Details</p>
              <h2 className="mt-4 font-display text-[24px] font-semibold tracking-[-0.025em] text-ink">
                Specifications
              </h2>
              <p className="mt-2 max-w-sm text-[12px] leading-relaxed text-ink-muted">
                Sample specifications included to demonstrate a product detail layout. Real figures
                would come from the supplier or manufacturer.
              </p>
            </div>
            <dl className="divide-y divide-line border-y border-line">
              {product.specs.map((spec) => (
                <div key={spec.label} className="grid grid-cols-2 gap-4 py-3.5 text-[12.5px]">
                  <dt className="text-ink-muted">{spec.label}</dt>
                  <dd className="text-right font-medium text-ink/80">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper py-14 sm:py-16">
        <div className="container-page">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Keep exploring</p>
              <h2 className="mt-4 font-display text-[26px] font-semibold tracking-[-0.03em] text-ink sm:text-[32px]">
                You may also like
              </h2>
            </div>
            <Link to="/shop" className="link-underline">
              View all products
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {related.map((item) => (
              <Reveal key={item.id}>
                <ProductCard product={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
