import { AlertCircle, ArrowRight, CheckCircle2, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { products } from '../data/products';
import { demoNotes, site } from '../data/site';
import { isEmail, isPhone, makeDemoReference } from '../lib/format';
import { DemoNote } from './DemoNote';

type FieldName = 'name' | 'phone' | 'email' | 'enquiry' | 'message';

interface FormState {
  name: string;
  phone: string;
  email: string;
  enquiry: string;
  message: string;
}

type Errors = Partial<Record<FieldName, string>>;

interface SubmittedDemo {
  reference: string;
  name: string;
  enquiry: string;
}

const initialState: FormState = {
  name: '',
  phone: '',
  email: '',
  enquiry: 'General enquiry',
  message: '',
};

function validate(values: FormState): Errors {
  const errors: Errors = {};

  if (!values.name.trim()) errors.name = 'Please enter your name.';
  else if (values.name.trim().length < 2) errors.name = 'Please enter at least 2 characters.';

  if (!values.phone.trim()) errors.phone = 'Please enter a phone number so Kelly Zambia could reply.';
  else if (!isPhone(values.phone)) errors.phone = 'Enter a valid phone number, e.g. +260 9XX XXX XXX.';

  if (values.email.trim() && !isEmail(values.email)) {
    errors.email = 'Enter a valid email address, or leave this field blank.';
  }

  if (!values.message.trim()) errors.message = 'Please add a short message.';
  else if (values.message.trim().length < 10) {
    errors.message = 'Please add a little more detail (at least 10 characters).';
  }

  return errors;
}

interface EnquiryFormProps {
  initialProduct?: string;
  compact?: boolean;
}

export function EnquiryForm({ initialProduct, compact = false }: EnquiryFormProps) {
  const [values, setValues] = useState<FormState>(() => ({
    ...initialState,
    enquiry: initialProduct ? `Product: ${initialProduct}` : initialState.enquiry,
    message: initialProduct ? `I'd like to ask about the ${initialProduct}.\n\n` : '',
  }));
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [submitted, setSubmitted] = useState<SubmittedDemo | null>(null);
  const [attempted, setAttempted] = useState(false);
  const summaryRef = useRef<HTMLDivElement | null>(null);
  const successRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);

  function update(field: FieldName, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (touched[field] || attempted) {
      setErrors(validate({ ...values, [field]: value }));
    }
  }

  function handleBlur(field: FieldName) {
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors(validate(values));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttempted(true);
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      summaryRef.current?.focus();
      return;
    }

    // Demo only: the values are intentionally not transmitted or stored.
    setSubmitted({
      reference: makeDemoReference(),
      name: values.name.trim(),
      enquiry: values.enquiry,
    });
  }

  function reset() {
    setValues({
      ...initialState,
      enquiry: initialProduct ? `Product: ${initialProduct}` : initialState.enquiry,
    });
    setErrors({});
    setTouched({});
    setAttempted(false);
    setSubmitted(null);
  }

  const errorCount = Object.keys(errors).length;
  const showError = (field: FieldName) => (touched[field] || attempted) && errors[field];

  if (submitted) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="animate-fade-up rounded-xl border border-line bg-white p-7 sm:p-9"
      >
        <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-display text-[22px] font-semibold tracking-[-0.02em] text-ink">
          Demo enquiry received
        </h3>
        <p className="mt-2 max-w-md text-[13.5px] leading-relaxed text-ink/70">
          Thanks, {submitted.name.split(' ')[0]}. This confirms the enquiry form is working — but it
          is a demonstration. Your message was <strong className="font-semibold text-ink">not sent</strong> to
          Kelly Zambia and nothing was stored or shared.
        </p>

        <dl className="mt-6 grid gap-3 rounded-lg border border-line bg-mist/50 p-4 text-[12px] sm:grid-cols-2">
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
              Demo reference
            </dt>
            <dd className="mt-1 font-semibold text-ink">{submitted.reference}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
              Enquiry type
            </dt>
            <dd className="mt-1 font-semibold text-ink">{submitted.enquiry}</dd>
          </div>
        </dl>

        <div className="mt-5 flex flex-wrap gap-2.5">
          <button type="button" onClick={reset} className="btn-outline btn-sm">
            Send another demo enquiry
          </button>
          <a href={`mailto:?subject=${encodeURIComponent('Kelly Zambia demo enquiry')}`} className="btn-ghost btn-sm">
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            {site.contact.email.value}
          </a>
        </div>

        <DemoNote className="mt-5" label="Demo">
          {demoNotes.enquiry} In a live version, this form would be connected to Kelly Zambia's
          preferred inbox or WhatsApp.
        </DemoNote>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-xl border border-line bg-white p-6 sm:p-7">
      {attempted && errorCount > 0 ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="mb-6 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-[12px] text-red-700"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>
            Please check {errorCount} {errorCount === 1 ? 'field' : 'fields'} below before
            submitting the demo form.
          </span>
        </div>
      ) : null}

      <div className={compact ? 'grid gap-4' : 'grid gap-5 sm:grid-cols-2'}>
        <div>
          <label htmlFor="enquiry-name" className="field-label">
            Your name <span className="text-accent">*</span>
          </label>
          <input
            id="enquiry-name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update('name', event.target.value)}
            onBlur={() => handleBlur('name')}
            aria-required="true"
            aria-invalid={Boolean(showError('name'))}
            aria-describedby={showError('name') ? 'enquiry-name-error' : undefined}
            placeholder="e.g. Chanda Mwale"
            className={`input ${showError('name') ? 'input-error' : ''}`}
          />
          {showError('name') ? (
            <p id="enquiry-name-error" className="field-error">
              <AlertCircle className="h-3 w-3" aria-hidden="true" />
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="enquiry-phone" className="field-label">
            Phone number <span className="text-accent">*</span>
          </label>
          <input
            id="enquiry-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => update('phone', event.target.value)}
            onBlur={() => handleBlur('phone')}
            aria-required="true"
            aria-invalid={Boolean(showError('phone'))}
            aria-describedby={showError('phone') ? 'enquiry-phone-error' : undefined}
            placeholder="+260 9XX XXX XXX"
            className={`input ${showError('phone') ? 'input-error' : ''}`}
          />
          {showError('phone') ? (
            <p id="enquiry-phone-error" className="field-error">
              <AlertCircle className="h-3 w-3" aria-hidden="true" />
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div className={compact ? '' : 'sm:col-span-2'}>
          <label htmlFor="enquiry-email" className="field-label">
            Email address <span className="font-normal text-ink-muted">(optional)</span>
          </label>
          <input
            id="enquiry-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update('email', event.target.value)}
            onBlur={() => handleBlur('email')}
            aria-invalid={Boolean(showError('email'))}
            aria-describedby={showError('email') ? 'enquiry-email-error' : undefined}
            placeholder="you@example.com"
            className={`input ${showError('email') ? 'input-error' : ''}`}
          />
          {showError('email') ? (
            <p id="enquiry-email-error" className="field-error">
              <AlertCircle className="h-3 w-3" aria-hidden="true" />
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className={compact ? '' : 'sm:col-span-2'}>
          <label htmlFor="enquiry-topic" className="field-label">
            Product or enquiry
          </label>
          <select
            id="enquiry-topic"
            name="enquiry"
            value={values.enquiry}
            onChange={(event) => update('enquiry', event.target.value)}
            className="input appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236B7A89%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_14px_center] bg-no-repeat pr-10"
          >
            <option>General enquiry</option>
            <option>Product availability</option>
            <option>Guidance choosing a product</option>
            <option>Business or bulk enquiry</option>
            <optgroup label="Sample products">
              {products.map((product) => (
                <option key={product.id} value={`Product: ${product.name}`}>
                  {product.name}
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        <div className={compact ? '' : 'sm:col-span-2'}>
          <label htmlFor="enquiry-message" className="field-label">
            Message <span className="text-accent">*</span>
          </label>
          <textarea
            id="enquiry-message"
            name="message"
            rows={compact ? 4 : 5}
            value={values.message}
            onChange={(event) => update('message', event.target.value)}
            onBlur={() => handleBlur('message')}
            aria-required="true"
            aria-invalid={Boolean(showError('message'))}
            aria-describedby={
              showError('message') ? 'enquiry-message-error' : 'enquiry-message-hint'
            }
            placeholder="Tell Kelly Zambia what you're looking for, or ask a question about a product."
            className={`input resize-y ${showError('message') ? 'input-error' : ''}`}
          />
          {showError('message') ? (
            <p id="enquiry-message-error" className="field-error">
              <AlertCircle className="h-3 w-3" aria-hidden="true" />
              {errors.message}
            </p>
          ) : (
            <p id="enquiry-message-hint" className="field-hint mt-1.5">
              No payment or sensitive information is needed for this demo.
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" className="btn-primary sm:min-w-[190px]">
          <Send className="h-4 w-4" aria-hidden="true" />
          Send demo enquiry
        </button>
        <p className="text-[10.5px] leading-relaxed text-ink-muted">
          Demo form — your message is not actually delivered.
        </p>
      </div>
    </form>
  );
}
