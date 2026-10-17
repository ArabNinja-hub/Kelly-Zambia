import { ChevronDown, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { ContactDetails } from '../components/ContactDetails';
import { DemoNote } from '../components/DemoNote';
import { EnquiryForm } from '../components/EnquiryForm';
import { PageHeader } from '../components/PageHeader';
import { Reveal } from '../components/Reveal';
import { demoNotes, site } from '../data/site';
import { useDocumentTitle } from '../lib/hooks';

const faqs = [
  {
    question: 'Is this a real online store?',
    answer:
      'No. This is a demonstration website prepared to show how Kelly Zambia could present technology products online. Products, specifications and prices are illustrative samples, and no orders or payments can be made.',
  },
  {
    question: 'What happens when I send the enquiry form?',
    answer:
      'The form validates your entries and shows a demo confirmation screen. Nothing is emailed, stored or shared with Kelly Zambia. It exists to demonstrate the customer experience.',
  },
  {
    question: 'How would contact details work in a live version?',
    answer:
      'The phone, WhatsApp, email and location fields are placeholders. Once Kelly Zambia supplies verified details, they can be dropped into the central site settings and would appear here, in the footer and on product pages.',
  },
  {
    question: 'Can products and prices be replaced?',
    answer:
      'Yes. All sample products live in one editable data file with clear instructions. Imagery can be swapped for real product photography, and prices updated to confirmed Zambian kwacha pricing.',
  },
];

export function ContactPage() {
  const [searchParams] = useSearchParams();
  const productParam = searchParams.get('product') ?? '';

  useDocumentTitle('Contact');

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
        eyebrow="Contact & enquiries"
        title="Let’s talk technology."
        description="Questions about a product, availability or the right fit? This demo shows how customers could start a conversation with Kelly Zambia — with contact details kept as clear placeholders until verified."
      />

      <section className="bg-white py-12 sm:py-16">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <Reveal>
              <h2 className="font-display text-[22px] font-semibold tracking-[-0.02em] text-ink">
                Contact details
              </h2>
              <p className="mt-2 max-w-sm text-[12.5px] leading-relaxed text-ink-muted">
                These fields are intentionally unfinished. Verified business contact information
                would replace each placeholder before launch.
              </p>

              <ContactDetails columns={2} />

              <div className="mt-4 rounded-lg border border-line bg-paper p-4">
                <div className="flex items-start gap-2.5">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" aria-hidden="true" />
                  <div>
                    <p className="text-[11.5px] font-semibold text-ink">Opening hours</p>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-ink-muted">
                      {site.hoursNote}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {[Phone, MessageCircle, Mail, MapPin].map((Icon, index) => (
                  <span
                    key={index}
                    className="grid h-8 w-8 place-items-center rounded-md border border-line bg-white text-ink-muted"
                    aria-hidden="true"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                ))}
                <span className="text-[10.5px] text-ink-muted">
                  Details pending verified information
                </span>
              </div>

              <DemoNote className="mt-5">
                No phone number, WhatsApp link, email address or physical address has been invented
                for this demo.
              </DemoNote>
            </Reveal>

            <Reveal delay={60}>
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-[22px] font-semibold tracking-[-0.02em] text-ink">
                    Send a demo enquiry
                  </h2>
                  <p className="mt-1.5 max-w-md text-[12.5px] leading-relaxed text-ink-muted">
                    {productParam
                      ? `You’re asking about the ${productParam}. `
                      : ''}
                    Required fields are marked with an asterisk.
                  </p>
                </div>
              </div>
              <EnquiryForm
                key={productParam || 'general'}
                initialProduct={productParam || undefined}
              />
              <DemoNote className="mt-4" label="Demo only">
                {demoNotes.enquiry}
              </DemoNote>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper py-12 sm:py-16">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[0.6fr_1.4fr] lg:gap-14">
            <div>
              <p className="eyebrow">Good to know</p>
              <h2 className="mt-4 font-display text-[26px] font-semibold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[32px]">
                Questions about this demo
              </h2>
              <p className="mt-3 max-w-xs text-[12.5px] leading-relaxed text-ink-muted">
                Clear answers about what is real here and what is illustrative.
              </p>
            </div>
            <div className="divide-y divide-line border-y border-line">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-1">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[13px] font-semibold text-ink transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <ChevronDown
                      className="h-4 w-4 shrink-0 text-ink-muted transition-transform duration-200 group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="max-w-2xl pb-4 pr-8 text-[12.5px] leading-relaxed text-ink-muted">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link to="/shop" className="btn-dark btn-sm">
              Explore the demo catalogue
            </Link>
            <Link to="/about" className="link-underline">
              Read about this demo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
