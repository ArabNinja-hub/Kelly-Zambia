import { ArrowRight, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../lib/hooks';

export function NotFoundPage() {
  useDocumentTitle('Page not found');

  return (
    <section className="bg-paper">
      <div className="container-page flex min-h-[62vh] flex-col justify-center py-20">
        <div className="max-w-xl">
          <p className="eyebrow">404 — not found</p>
          <h1 className="mt-4 font-display text-[40px] font-semibold leading-[1.02] tracking-[-0.045em] text-ink sm:text-[56px]">
            This page isn’t part of the demo.
          </h1>
          <p className="mt-4 max-w-md text-[14px] leading-relaxed text-ink-muted">
            The link may be out of date, or the page may not exist yet. Everything in this
            demonstration is reachable from the homepage and the sample catalogue.
          </p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            <Link to="/shop" className="btn-primary">
              <Compass className="h-4 w-4" aria-hidden="true" />
              Browse products
            </Link>
            <Link to="/" className="btn-outline">
              Back to home
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
