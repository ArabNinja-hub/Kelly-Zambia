/**
 * Central site copy and contact settings for the Kelly Zambia demo.
 *
 * DEMO CONTENT: all contact fields are intentionally left as placeholders.
 * Replace them with verified business details before this site would go live.
 * Social media links are deliberately omitted until official URLs are supplied.
 */

export const DEMO_CONTENT = true;

export const site = {
  name: 'Kelly Zambia',
  legalName: 'Kelly Zambia',
  tagline: 'Your technology store in Zambia.',
  city: 'Lusaka, Zambia',
  contact: {
    phone: {
      label: 'Phone',
      value: '+260 — — — — — —',
      note: 'Official number to be supplied',
      href: null as string | null,
    },
    whatsapp: {
      label: 'WhatsApp',
      value: '+260 — — — — — —',
      note: 'Official WhatsApp number to be supplied',
      href: null as string | null,
    },
    email: {
      label: 'Email',
      value: 'Email address to be supplied',
      note: 'Official email address to be supplied',
      href: null as string | null,
    },
    location: {
      label: 'Location',
      value: 'Lusaka, Zambia',
      note: 'Exact store location to be confirmed',
      href: null as string | null,
    },
  },
  socialNote: 'Official social media profiles will be linked here once provided.',
  hoursNote: 'Opening hours to be confirmed by Kelly Zambia.',
} as const;

export const demoNotes = {
  product:
    'Demo data: product names, specifications and prices are illustrative samples — not verified Kelly Zambia stock or pricing.',
  pricing:
    'Illustrative demo pricing in Zambian kwacha (ZMW). Final range and pricing would be confirmed by Kelly Zambia.',
  availability: 'Availability, warranty and delivery terms are shown as “to be confirmed” throughout this demo.',
  checkout:
    'Demo checkout only. No payment details are collected, no payment is processed and no order is placed.',
  enquiry:
    'Demo form only. Your message is not sent anywhere and no information is shared with Kelly Zambia.',
  cart: 'Your bag is stored only in this browser for demonstration purposes.',
  categories:
    'Proposed demo categories, shown to illustrate how the store’s range could be browsed.',
  service:
    'Proposed service highlights for this demo — to be confirmed and edited with Kelly Zambia before launch.',
  about:
    'This page presents Kelly Zambia as a technology and electronics retailer for the purpose of this website demonstration. No company history, founding details or business achievements are stated.',
} as const;

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Categories', to: '/categories' },
  { label: 'About us', to: '/about' },
  { label: 'Contact', to: '/contact' },
] as const;

export const serviceHighlights = [
  {
    icon: 'discover',
    title: 'A considered range',
    description:
      'Phones, computers, audio, wearables and everyday accessories gathered in one place, so the range is easier to browse.',
  },
  {
    icon: 'guidance',
    title: 'Guidance when you need it',
    description:
      'A clear product layout and straightforward enquiries make it easier to ask questions before deciding what suits you.',
  },
  {
    icon: 'enquiry',
    title: 'Simple enquiries',
    description:
      'A short enquiry form keeps the path from interest to conversation direct — no account creation required.',
  },
  {
    icon: 'local',
    title: 'Local to Zambia',
    description:
      'A Zambia-focused storefront with prices shown in Zambian kwacha, built around local customers and local conversations.',
  },
] as const;
