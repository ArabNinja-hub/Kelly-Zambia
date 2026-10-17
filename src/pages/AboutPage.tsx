import {
  ArrowRight,
  ArrowUpRight,
  CircleHelp,
  Compass,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { DemoNote } from '../components/DemoNote';
import { PageHeader } from '../components/PageHeader';
import { Reveal } from '../components/Reveal';
import { demoNotes } from '../data/site';
import { assetUrl } from '../lib/format';
import { useDocumentTitle } from '../lib/hooks';

const steps = [
  {
    number: '01',
    icon: Compass,
    title: 'Discover',
    description:
      'A category-led homepage and clear product cards make it easy to see what kind of technology is available before going deeper.',
  },
  {
    number: '02',
    icon: CircleHelp,
    title: 'Understand',
    description:
      'Product pages bring together imagery, sample specifications and straightforward language, with unverified details clearly marked.',
  },
  {
    number: '03',
    icon: MessageCircle,
    title: 'Enquire',
    description:
      'A short enquiry form and visible contact placeholders create an obvious next step for questions, availability checks and guidance.',
  },
];

const omissions = [
  'No founding date, company history or founder names',
  'No branch count, physical address or opening hours',
  'No verified stock levels, warranties or delivery promises',
  'No claims of authorised distribution or brand partnerships',
  'No payment processing, secure-checkout or financing claims',
  'No customer reviews, ratings or testimonials',
];

export function AboutPage() {
  useDocumentTitle('About');

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'About us' }]}
        eyebrow="About this project"
        title={
          <>
            Kelly Zambia, presented online.
          </>
        }
        description="This website is a presentation demo, built to show how a technology and electronics retailer in Zambia could present its range, build trust and invite enquiries."
        aside={
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            Demo website concept
          </span>
        }
      />

      <section className="bg-canvas py-14 sm:py-18">
        <div className="container-page">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow">A local technology store</p>
              <h2 className="mt-4 max-w-lg font-display text-[30px] font-semibold leading-[1.07] tracking-[-0.035em] text-ink sm:text-[38px]">
                A considered storefront for everyday technology.
              </h2>
              <div className="mt-5 space-y-4 text-[13.5px] leading-relaxed text-ink/70">
                <p>
                  Kelly Zambia is presented in this demo as a technology and electronics retailer
                  serving customers in Zambia — a business that could help people find the devices
                  and accessories that fit their work, study and everyday lives.
                </p>
                <p>
                  The design puts product discovery first: a calm interface, consistent product
                  photography and clear typography, with enquiries kept close to the products they
                  relate to. Nothing here is invented company history; every business detail is
                  either a visible placeholder or clearly marked demo content.
                </p>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-line bg-paper p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                    Positioning
                  </p>
                  <p className="mt-1.5 text-[12.5px] font-medium leading-relaxed text-ink/70">
                    Technology &amp; electronics retail in Zambia
                  </p>
                </div>
                <div className="rounded-lg border border-line bg-paper p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                    Demo pricing
                  </p>
                  <p className="mt-1.5 text-[12.5px] font-medium leading-relaxed text-ink/70">
                    Displayed in Zambian kwacha (ZMW)
                  </p>
                </div>
              </div>

              <DemoNote className="mt-5" label="Demo note">
                {demoNotes.about}
              </DemoNote>
            </Reveal>

            <Reveal delay={60}>
              <div className="relative">
                <div className="overflow-hidden rounded-xl border border-line">
                  <img
                    src={assetUrl('/images/about-workspace.webp')}
                    alt="Laptop and smartphone on a light studio surface"
                    loading="lazy"
                    className="aspect-[5/4] w-full object-cover"
                  />
                </div>
                <div className="mt-3 grid grid-cols-[1fr_0.7fr] gap-3">
                  <div className="overflow-hidden rounded-xl border border-line">
                    <img
                      src={assetUrl('/images/editorial-audio.webp')}
                      alt="Headphones and a smartwatch on display platforms"
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between rounded-xl border border-line bg-ink p-4 text-white">
                    <ShieldCheck className="h-5 w-5 text-white/60" aria-hidden="true" />
                    <div>
                      <p className="font-display text-[13px] font-semibold leading-snug">
                        Honest by default.
                      </p>
                      <p className="mt-1 text-[10.5px] leading-relaxed text-white/60">
                        Unverified details are labelled, not implied.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white py-14 sm:py-18">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow">What the demo sets out to show</p>
            <h2 className="mt-4 font-display text-[28px] font-semibold leading-[1.08] tracking-[-0.035em] text-ink sm:text-[36px]">
              A clear path from browsing to a conversation.
            </h2>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <Reveal key={step.number} delay={index * 60}>
                <div className="flex h-full flex-col rounded-xl border border-line bg-white p-6">
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-mist text-ink">
                      <step.icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </span>
                    <span className="font-display text-[11px] font-semibold tracking-[0.12em] text-ink/25">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-[17px] font-semibold tracking-[-0.01em] text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-ink-muted">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-canvas py-14 sm:py-18">
        <div className="container-page">
          <div className="grid gap-8 rounded-xl border border-line bg-white p-6 sm:p-9 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <div>
              <p className="eyebrow">Deliberately left out</p>
              <h2 className="mt-4 max-w-sm font-display text-[26px] font-semibold leading-[1.1] tracking-[-0.03em] text-ink">
                What this demo does not claim.
              </h2>
              <p className="mt-3 max-w-sm text-[12.5px] leading-relaxed text-ink-muted">
                These details would be supplied by Kelly Zambia before a live launch. Until then,
                the demo keeps them visibly unconfirmed rather than inventing them.
              </p>
              <Link to="/contact" className="link-underline mt-5">
                Discuss the details
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
            <ul className="grid gap-x-8 gap-y-0 sm:grid-cols-2">
              {omissions.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 border-b border-line/70 py-3.5 text-[12px] leading-relaxed text-ink/70 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0"
                >
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-ink/25" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-14 text-white sm:py-16">
        <div className="container-page">
          <div className="flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
            <div className="max-w-xl">
              <p className="eyebrow text-accent-soft before:bg-white/30">Next step</p>
              <h2 className="mt-4 font-display text-[28px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[34px]">
                See the storefront, then tell us what to change.
              </h2>
              <p className="mt-3 max-w-md text-[13px] leading-relaxed text-white/60">
                Replace the sample catalogue with verified products, confirm contact details and the
                demo becomes a realistic picture of Kelly Zambia online.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <Link to="/shop" className="btn h-11 bg-white px-5 text-ink hover:bg-white/90">
                Explore products
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/contact"
                className="btn h-11 border border-white/20 px-5 text-white hover:border-white/40 hover:bg-white/5"
              >
                Contact Kelly Zambia
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
