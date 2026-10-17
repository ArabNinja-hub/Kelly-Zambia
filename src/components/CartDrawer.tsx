import { ArrowRight, Minus, Plus, Trash2, X } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { demoNotes } from '../data/site';
import { useCart } from '../lib/cart';
import { formatZMW, pluralise } from '../lib/format';
import { useOverlay } from '../lib/hooks';
import { BagIcon } from './BagIcon';
import { DemoNote } from './DemoNote';

export function CartDrawer() {
  const { items, itemCount, subtotal, isOpen, closeCart, updateQuantity, removeItem } = useCart();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useOverlay(isOpen, closeCart, panelRef, closeRef);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        onClick={closeCart}
        className="absolute inset-0 h-full w-full cursor-default bg-navy-950/45 backdrop-blur-[2px] animate-fade-in"
        aria-label="Close shopping bag"
        tabIndex={-1}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        tabIndex={-1}
        className="absolute inset-y-0 right-0 flex w-[min(94vw,440px)] flex-col bg-white shadow-panel animate-slide-in"
      >
        <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-line px-5">
          <div className="flex items-center gap-2.5">
            <BagIcon className="h-4 w-4 text-ink/70" />
            <h2 className="font-display text-[16px] font-semibold tracking-[-0.01em] text-ink">
              Your bag
            </h2>
            <span className="rounded-full bg-mist px-2 py-0.5 text-[10.5px] font-semibold text-ink-muted">
              {itemCount} {pluralise(itemCount, 'item')}
            </span>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={closeCart}
            className="grid h-9 w-9 place-items-center rounded-md text-ink-muted transition-colors hover:bg-mist hover:text-ink"
            aria-label="Close shopping bag"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-mist">
              <BagIcon className="h-6 w-6 text-ink-muted" />
            </span>
            <h3 className="mt-5 font-display text-[18px] font-semibold text-ink">
              Your bag is empty
            </h3>
            <p className="mt-2 max-w-[260px] text-[13px] leading-relaxed text-ink-muted">
              Browse the illustrative demo catalogue and add a product to see how the bag works.
            </p>
            <Link to="/shop" onClick={closeCart} className="btn-primary mt-6">
              Explore products
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <>
            <div className="thin-scrollbar flex-1 overflow-y-auto px-5">
              <ul className="divide-y divide-line/80">
                {items.map(({ product, quantity, lineTotal }) => (
                  <li key={product.id} className="flex gap-4 py-5">
                    <Link
                      to={`/product/${product.slug}`}
                      onClick={closeCart}
                      className="h-[86px] w-[86px] shrink-0 overflow-hidden rounded-lg border border-line/70 bg-mist"
                    >
                      <img
                        src={product.image}
                        alt={product.imageAlt}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <Link
                            to={`/product/${product.slug}`}
                            onClick={closeCart}
                            className="block truncate text-[13.5px] font-semibold text-ink transition-colors hover:text-accent"
                          >
                            {product.name}
                          </Link>
                          <p className="mt-0.5 truncate text-[11px] text-ink-muted">{product.tagline}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(product.id)}
                          className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-ink-muted transition-colors hover:bg-red-50 hover:text-red-600"
                          aria-label={`Remove ${product.name} from bag`}
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-end justify-between gap-3 pt-3">
                        <div className="inline-flex items-center rounded-md border border-line">
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="grid h-8 w-8 place-items-center rounded-l-md text-ink-muted transition-colors hover:bg-mist hover:text-ink"
                            aria-label={`Decrease quantity of ${product.name}`}
                          >
                            <Minus className="h-3 w-3" aria-hidden="true" />
                          </button>
                          <span className="w-7 text-center text-[12px] font-semibold tabular-nums text-ink">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            disabled={quantity >= 99}
                            className="grid h-8 w-8 place-items-center rounded-r-md text-ink-muted transition-colors hover:bg-mist hover:text-ink disabled:opacity-30"
                            aria-label={`Increase quantity of ${product.name}`}
                          >
                            <Plus className="h-3 w-3" aria-hidden="true" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-[13px] font-semibold tabular-nums text-ink">
                            {formatZMW(lineTotal)}
                          </p>
                          {quantity > 1 ? (
                            <p className="text-[10.5px] text-ink-muted">
                              {formatZMW(product.price)} each
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="pb-6 pt-1">
                <DemoNote>{demoNotes.cart}</DemoNote>
              </div>
            </div>

            <div className="shrink-0 border-t border-line bg-mist/50 px-5 py-5">
              <div className="flex items-baseline justify-between">
                <span className="text-[12.5px] font-medium text-ink-muted">Demo subtotal</span>
                <span className="font-display text-[22px] font-semibold tabular-nums tracking-[-0.02em] text-ink">
                  {formatZMW(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-right text-[10.5px] text-ink-muted">
                {itemCount} {pluralise(itemCount, 'item')} · ZMW
              </p>
              <Link to="/checkout" onClick={closeCart} className="btn-primary mt-4 w-full">
                Continue to demo checkout
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <p className="mt-2.5 text-center text-[10px] leading-relaxed text-ink-muted">
                Demo only — no payment details are collected and no order is placed.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
