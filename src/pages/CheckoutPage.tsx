import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Minus,
  Plus,
  Trash2,
} from 'lucide-react';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { BagIcon } from '../components/BagIcon';
import { DemoNote } from '../components/DemoNote';
import { PageHeader } from '../components/PageHeader';
import { demoNotes } from '../data/site';
import { useCart } from '../lib/cart';
import { formatZMW, isEmail, isPhone, makeDemoReference, pluralise } from '../lib/format';
import { useDocumentTitle } from '../lib/hooks';

interface PlacedDemo {
  reference: string;
  name: string;
  total: number;
  itemCount: number;
  lines: { name: string; quantity: number; lineTotal: number }[];
}

interface FormValues {
  name: string;
  phone: string;
  email: string;
  note: string;
  acknowledged: boolean;
}

const initialValues: FormValues = {
  name: '',
  phone: '',
  email: '',
  note: '',
  acknowledged: false,
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

export function CheckoutPage() {
  useDocumentTitle('Demo checkout');

  const { items, itemCount, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [placed, setPlaced] = useState<PlacedDemo | null>(null);
  const successRef = useRef<HTMLDivElement | null>(null);

  function update<K extends keyof FormValues>(field: K, value: FormValues[K]) {
    setValues((current) => {
      const next = { ...current, [field]: value };
      if (attempted) setErrors(validate(next));
      return next;
    });
  }

  function validate(next: FormValues): FormErrors {
    const nextErrors: FormErrors = {};
    if (!next.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!next.phone.trim()) nextErrors.phone = 'Please enter a phone number.';
    else if (!isPhone(next.phone)) nextErrors.phone = 'Enter a valid phone number.';
    if (next.email.trim() && !isEmail(next.email)) nextErrors.email = 'Enter a valid email address.';
    if (!next.acknowledged) {
      nextErrors.acknowledged = 'Please confirm that you understand this is a demo checkout.';
    }
    return nextErrors;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttempted(true);
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const snapshot: PlacedDemo = {
      reference: makeDemoReference(),
      name: values.name.trim(),
      total: subtotal,
      itemCount,
      lines: items.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        lineTotal: item.lineTotal,
      })),
    };

    clearCart();
    setPlaced(snapshot);
    window.setTimeout(() => successRef.current?.focus(), 60);
  }

  if (placed) {
    return (
      <section className="container-page py-16 sm:py-24">
        <div
          ref={successRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className="mx-auto max-w-2xl animate-fade-up"
        >
          <span className="grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
          </span>
          <p className="mt-6 eyebrow">Demo checkout</p>
          <h1 className="mt-3 font-display text-[32px] font-semibold leading-[1.05] tracking-[-0.04em] text-ink sm:text-[42px]">
            Demo enquiry “placed”.
          </h1>
          <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-ink/70">
            Thanks, {placed.name.split(' ')[0]}. This screen confirms the demo checkout flow works.
            <strong className="font-semibold text-ink"> No order was placed</strong>, no payment was
            taken and no information was sent to Kelly Zambia.
          </p>

          <div className="mt-7 overflow-hidden rounded-xl border border-line bg-white">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-paper px-5 py-3.5">
              <div>
                <p className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  Demo reference
                </p>
                <p className="mt-0.5 text-[12.5px] font-semibold text-ink">{placed.reference}</p>
              </div>
              <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[9.5px] font-semibold uppercase tracking-[0.1em] text-amber-700">
                Not a real order
              </span>
            </div>
            <ul className="divide-y divide-line px-5">
              {placed.lines.map((line) => (
                <li key={line.name} className="flex items-center justify-between gap-4 py-3">
                  <span className="text-[12.5px] text-ink/70">
                    {line.name}
                    <span className="ml-1.5 text-ink-muted">× {line.quantity}</span>
                  </span>
                  <span className="text-[12.5px] font-medium tabular-nums text-ink">
                    {formatZMW(line.lineTotal)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex items-baseline justify-between border-t border-line bg-paper px-5 py-4">
              <span className="text-[12px] text-ink-muted">
                Demo subtotal · {placed.itemCount} {pluralise(placed.itemCount, 'item')}
              </span>
              <span className="font-display text-[20px] font-semibold tabular-nums text-ink">
                {formatZMW(placed.total)}
              </span>
            </div>
          </div>

          <DemoNote className="mt-5">
            This demo does not process payments, calculate delivery, reserve stock or share
            details. A live checkout would be designed around Kelly Zambia’s confirmed payment and
            fulfilment options.
          </DemoNote>

          <div className="mt-7 flex flex-wrap gap-2.5">
            <Link to="/shop" className="btn-primary btn-sm">
              Continue browsing
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link to="/contact" className="btn-outline btn-sm">
              Contact Kelly Zambia
            </Link>
            <button type="button" onClick={() => setPlaced(null)} className="btn-ghost btn-sm">
              Start a new demo bag
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <PageHeader
          crumbs={[
            { label: 'Home', to: '/' },
            { label: 'Shop', to: '/shop' },
            { label: 'Demo checkout' },
          ]}
          eyebrow="Demo checkout"
          title="Your bag is empty."
          description="Add a sample product to the bag to see how the demo enquiry flow works. No payment details are ever requested."
        />
        <section className="container-page py-16">
          <div className="mx-auto flex max-w-md flex-col items-center rounded-xl border border-dashed border-ink/15 bg-paper px-6 py-14 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-ink-muted">
              <BagIcon className="h-6 w-6" />
            </span>
            <h2 className="mt-5 font-display text-[20px] font-semibold text-ink">
              Nothing in the demo bag yet
            </h2>
            <p className="mt-2 text-[12.5px] leading-relaxed text-ink-muted">
              Browse the illustrative catalogue, open a product and add it to your bag.
            </p>
            <Link to="/shop" className="btn-primary btn-sm mt-5">
              Explore products
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Shop', to: '/shop' },
          { label: 'Demo checkout' },
        ]}
        eyebrow="Demo checkout"
        title="Review your demo bag."
        description="This is an enquiry-style checkout demonstration. No payment details are collected, no payment is processed and no order is placed."
      />

      <section className="bg-white py-10 sm:py-12">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <form onSubmit={handleSubmit} noValidate className="order-2 lg:order-1">
              <div className="rounded-xl border border-line bg-white p-6 sm:p-7">
                <h2 className="font-display text-[19px] font-semibold tracking-[-0.02em] text-ink">
                  Enquiry details
                </h2>
                <p className="mt-1.5 text-[12px] leading-relaxed text-ink-muted">
                  In a live store these details would be used to follow up about availability and
                  collection. Here, they are validated but never transmitted.
                </p>

                {attempted && Object.keys(errors).length > 0 ? (
                  <div
                    role="alert"
                    className="mt-5 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-[12px] text-red-700"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    Please complete the highlighted fields before continuing.
                  </div>
                ) : null}

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="checkout-name" className="field-label">
                      Full name <span className="text-accent">*</span>
                    </label>
                    <input
                      id="checkout-name"
                      type="text"
                      autoComplete="name"
                      value={values.name}
                      onChange={(event) => update('name', event.target.value)}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'checkout-name-error' : undefined}
                      className={`input ${errors.name ? 'input-error' : ''}`}
                      placeholder="e.g. Chanda Mwale"
                    />
                    {errors.name ? (
                      <p id="checkout-name-error" className="field-error">
                        <AlertCircle className="h-3 w-3" aria-hidden="true" />
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="checkout-phone" className="field-label">
                      Phone number <span className="text-accent">*</span>
                    </label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={values.phone}
                      onChange={(event) => update('phone', event.target.value)}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'checkout-phone-error' : undefined}
                      className={`input ${errors.phone ? 'input-error' : ''}`}
                      placeholder="+260 9XX XXX XXX"
                    />
                    {errors.phone ? (
                      <p id="checkout-phone-error" className="field-error">
                        <AlertCircle className="h-3 w-3" aria-hidden="true" />
                        {errors.phone}
                      </p>
                    ) : null}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="checkout-email" className="field-label">
                      Email address <span className="font-normal text-ink-muted">(optional)</span>
                    </label>
                    <input
                      id="checkout-email"
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={(event) => update('email', event.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'checkout-email-error' : undefined}
                      className={`input ${errors.email ? 'input-error' : ''}`}
                      placeholder="you@example.com"
                    />
                    {errors.email ? (
                      <p id="checkout-email-error" className="field-error">
                        <AlertCircle className="h-3 w-3" aria-hidden="true" />
                        {errors.email}
                      </p>
                    ) : null}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="checkout-note" className="field-label">
                      Anything we should know? <span className="font-normal text-ink-muted">(optional)</span>
                    </label>
                    <textarea
                      id="checkout-note"
                      rows={3}
                      value={values.note}
                      onChange={(event) => update('note', event.target.value)}
                      className="input resize-y"
                      placeholder="Preferred contact time, questions about a product, etc."
                    />
                  </div>
                </div>

                <div className="mt-6 rounded-lg border border-line bg-paper p-4">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={values.acknowledged}
                      onChange={(event) => update('acknowledged', event.target.checked)}
                      aria-invalid={Boolean(errors.acknowledged)}
                      aria-describedby={errors.acknowledged ? 'checkout-ack-error' : undefined}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink/25 accent-accent"
                    />
                    <span className="text-[11.5px] leading-relaxed text-ink/70">
                      I understand this is a demo checkout. No payment will be taken, no order will
                      be placed and nothing will be sent to Kelly Zambia.
                    </span>
                  </label>
                  {errors.acknowledged ? (
                    <p id="checkout-ack-error" className="field-error ml-7">
                      <AlertCircle className="h-3 w-3" aria-hidden="true" />
                      {errors.acknowledged}
                    </p>
                  ) : null}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button type="submit" className="btn-primary sm:min-w-[210px]">
                    Place demo enquiry
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <Link to="/contact" className="btn-ghost btn-sm">
                    Or contact Kelly Zambia
                  </Link>
                </div>
                <p className="mt-3 text-[10px] leading-relaxed text-ink-muted">
                  Demo only. No payment fields, card details or sensitive information are requested
                  anywhere in this experience.
                </p>
              </div>
            </form>

            <aside className="order-1 lg:order-2" aria-label="Demo order summary">
              <div className="rounded-xl border border-line bg-paper lg:sticky lg:top-28">
                <div className="flex items-center justify-between border-b border-line px-5 py-4">
                  <h2 className="font-display text-[15px] font-semibold text-ink">Your demo bag</h2>
                  <span className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-ink-muted">
                    {itemCount} {pluralise(itemCount, 'item')}
                  </span>
                </div>

                <ul className="divide-y divide-line/80 px-5">
                  {items.map(({ product, quantity, lineTotal }) => (
                    <li key={product.id} className="flex gap-3.5 py-4">
                      <Link
                        to={`/product/${product.slug}`}
                        className="h-16 w-16 shrink-0 overflow-hidden rounded-md border border-line bg-mist"
                      >
                        <img
                          src={product.image}
                          alt={product.imageAlt}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </Link>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            to={`/product/${product.slug}`}
                            className="truncate text-[12px] font-semibold text-ink hover:text-accent"
                          >
                            {product.name}
                          </Link>
                          <button
                            type="button"
                            onClick={() => removeItem(product.id)}
                            className="grid h-6 w-6 shrink-0 place-items-center rounded text-ink-muted transition-colors hover:bg-red-50 hover:text-red-600"
                            aria-label={`Remove ${product.name} from bag`}
                          >
                            <Trash2 className="h-3 w-3" aria-hidden="true" />
                          </button>
                        </div>
                        <p className="mt-0.5 text-[10.5px] text-ink-muted">{formatZMW(product.price)} each</p>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="inline-flex items-center rounded border border-line bg-white">
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="grid h-6 w-6 place-items-center text-ink-muted hover:text-ink"
                              aria-label={`Decrease quantity of ${product.name}`}
                            >
                              <Minus className="h-2.5 w-2.5" aria-hidden="true" />
                            </button>
                            <span className="w-6 text-center text-[10.5px] font-semibold tabular-nums text-ink">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              disabled={quantity >= 99}
                              className="grid h-6 w-6 place-items-center text-ink-muted hover:text-ink disabled:opacity-30"
                              aria-label={`Increase quantity of ${product.name}`}
                            >
                              <Plus className="h-2.5 w-2.5" aria-hidden="true" />
                            </button>
                          </div>
                          <span className="text-[12px] font-semibold tabular-nums text-ink">
                            {formatZMW(lineTotal)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-line px-5 py-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[12px] font-medium text-ink-muted">Demo subtotal</span>
                    <span className="font-display text-[22px] font-semibold tabular-nums tracking-[-0.02em] text-ink">
                      {formatZMW(subtotal)}
                    </span>
                  </div>
                  <p className="mt-1 text-right text-[10px] text-ink-muted">ZMW · illustrative prices</p>
                  <div className="mt-4 space-y-1.5 border-t border-line/80 pt-3 text-[10.5px] text-ink-muted">
                    <p className="flex justify-between gap-2">
                      <span>Delivery &amp; collection</span>
                      <span className="text-ink-muted">To be confirmed</span>
                    </p>
                    <p className="flex justify-between gap-2">
                      <span>Payment</span>
                      <span className="text-ink-muted">Not part of this demo</span>
                    </p>
                  </div>
                </div>
              </div>
              <DemoNote className="mt-3" label="Demo bag">
                {demoNotes.checkout}
              </DemoNote>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
