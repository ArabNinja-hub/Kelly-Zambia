/**
 * ==========================================================================
 * DEMO PRODUCT DATA — ILLUSTRATIVE ONLY
 * ==========================================================================
 * Every product, product name, price, specification and description below is
 * sample content created for this demonstration. None of it is verified
 * information about Kelly Zambia's inventory, pricing or suppliers.
 *
 * TO REPLACE WITH VERIFIED BUSINESS DATA:
 *   1. Edit (or replace) the `products` array in this file.
 *   2. Keep each `slug` unique and URL-friendly.
 *   3. Use one of the category slugs defined in `src/data/categories.ts`.
 *   4. Point `image` at a product photo in `public/images/products/` — square
 *      images around 900 × 900 px work best.
 *   5. Remove the `DEMO_CONTENT` note from the UI once real data is in place
 *      (see `src/data/site.ts`).
 *
 * Prices are in Zambian kwacha (ZMW) and are displayed without decimals.
 * ==========================================================================
 */

import type { CategorySlug } from './categories';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  price: number;
  image: string;
  imageAlt: string;
  tagline: string;
  description: string;
  highlights: string[];
  specs: ProductSpec[];
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: 'kz-001',
    slug: 'nova-x-pro',
    name: 'Nova X Pro',
    category: 'smartphones',
    price: 18499,
    image: '/images/products/smartphone-navy.webp',
    imageAlt: 'Nova X Pro smartphone in deep navy, shown from the back',
    tagline: '6.7″ AMOLED · 256 GB · Triple camera',
    description:
      'A flagship-style smartphone built around a bright display, a flexible triple camera and all-day battery capacity. A sample product included to show how a phone listing could look.',
    highlights: [
      'Large-edge AMOLED display with a 120 Hz refresh rate',
      'Triple rear camera system for wide, ultra-wide and close-up shots',
      '256 GB of storage and fast charging support',
      'Premium glass and aluminium construction',
    ],
    specs: [
      { label: 'Display', value: '6.7″ AMOLED, 120 Hz' },
      { label: 'Storage', value: '256 GB' },
      { label: 'Rear camera', value: '50 MP + 12 MP + 10 MP (sample)' },
      { label: 'Front camera', value: '12 MP' },
      { label: 'Battery', value: '5,000 mAh, fast charge' },
      { label: 'Finish', value: 'Midnight navy' },
    ],
    featured: true,
  },
  {
    id: 'kz-003',
    slug: 'aerobook-14',
    name: 'AeroBook 14',
    category: 'laptops',
    price: 23999,
    image: '/images/products/laptop-silver.webp',
    imageAlt: 'AeroBook 14 laptop in silver, open and angled',
    tagline: '14″ display · 16 GB memory · 512 GB SSD',
    description:
      'A slim, aluminium laptop for everyday work, study and creative tasks. Sample specifications and imagery are shown for layout demonstration.',
    highlights: [
      'Slim aluminium chassis that travels easily',
      'Bright 14″ display with narrow bezels',
      'Fast solid-state storage for quick starts',
      'Backlit keyboard for low-light work',
    ],
    specs: [
      { label: 'Display', value: '14″ LED, 2.2K resolution' },
      { label: 'Memory', value: '16 GB' },
      { label: 'Storage', value: '512 GB SSD' },
      { label: 'Ports', value: 'USB-C, USB-A, HDMI, audio' },
      { label: 'Battery', value: 'Up to 12 hours (sample)' },
      { label: 'Finish', value: 'Silver' },
    ],
    featured: true,
  },
  {
    id: 'kz-004',
    slug: 'aerobook-pro-16',
    name: 'AeroBook Pro 16',
    category: 'laptops',
    price: 32999,
    image: '/images/products/laptop-graphite.webp',
    imageAlt: 'AeroBook Pro 16 laptop in graphite, open on a desk',
    tagline: '16″ display · 16 GB memory · 1 TB SSD',
    description:
      'A larger, more capable laptop for demanding workflows and creative projects. Sample product data for demonstration purposes.',
    highlights: [
      'Generous 16″ display for multi-window work',
      '1 TB of fast storage',
      'Comfortable full-size keyboard',
      'Graphite finish with a refined matte texture',
    ],
    specs: [
      { label: 'Display', value: '16″ LED, 3K resolution' },
      { label: 'Memory', value: '16 GB' },
      { label: 'Storage', value: '1 TB SSD' },
      { label: 'Ports', value: 'USB-C ×2, USB-A, HDMI, audio' },
      { label: 'Battery', value: 'Up to 14 hours (sample)' },
      { label: 'Finish', value: 'Graphite' },
    ],
    featured: true,
  },
  {
    id: 'kz-005',
    slug: 'luna-tab-11',
    name: 'Luna Tab 11',
    category: 'tablets',
    price: 11999,
    image: '/images/products/tablet.webp',
    imageAlt: 'Luna Tab 11 tablet in navy with a stylus beside it',
    tagline: '11″ display · 256 GB · Stylus support',
    description:
      'A versatile tablet for reading, notes and streaming, with stylus support for hand-written ideas. Sample product data for demonstration purposes.',
    highlights: [
      '11″ edge-to-edge display',
      'Stylus support for notes and sketching',
      '256 GB of storage',
      'Slim, lightweight aluminium body',
    ],
    specs: [
      { label: 'Display', value: '11″ LCD, 120 Hz' },
      { label: 'Storage', value: '256 GB' },
      { label: 'Stylus', value: 'Supported (sample)' },
      { label: 'Battery', value: 'Up to 10 hours (sample)' },
      { label: 'Finish', value: 'Midnight navy' },
      { label: 'Connectivity', value: 'Wi-Fi, Bluetooth' },
    ],
    featured: true,
  },
  {
    id: 'kz-007',
    slug: 'pulse-studio-headphones',
    name: 'Pulse Studio Headphones',
    category: 'audio',
    price: 3299,
    image: '/images/products/headphones.webp',
    imageAlt: 'Pulse Studio over-ear wireless headphones in black and navy',
    tagline: 'Wireless over-ear · Active noise cancellation',
    description:
      'Comfortable over-ear headphones for focused work and long listening sessions, with plush cushions and a clean, understated finish. Sample product data.',
    highlights: [
      'Active noise cancellation for quiet focus',
      'Soft memory-foam ear cushions',
      'Up to 30 hours of listening per charge (sample)',
      'Folds flat for travel',
    ],
    specs: [
      { label: 'Type', value: 'Over-ear, wireless' },
      { label: 'Noise control', value: 'Active noise cancellation' },
      { label: 'Battery', value: 'Up to 30 hours (sample)' },
      { label: 'Charging', value: 'USB-C' },
      { label: 'Connectivity', value: 'Bluetooth 5.3' },
      { label: 'Finish', value: 'Matte black / navy' },
    ],
    featured: true,
  },
  {
    id: 'kz-008',
    slug: 'pulse-air-earbuds',
    name: 'Pulse Air Earbuds',
    category: 'audio',
    price: 1899,
    image: '/images/products/earbuds.webp',
    imageAlt: 'Pulse Air wireless earbuds resting in an open navy charging case',
    tagline: 'True wireless · Compact charging case',
    description:
      'Compact true-wireless earbuds for calls, commutes and everyday listening. The supplied charging case keeps them topped up on the move. Sample product data.',
    highlights: [
      'True-wireless design with touch controls',
      'Pocketable charging case',
      'Clear voice pickup for calls',
      'Up to 24 hours total listening with the case (sample)',
    ],
    specs: [
      { label: 'Type', value: 'True wireless in-ear' },
      { label: 'Battery', value: '6 hrs + 18 hrs with case (sample)' },
      { label: 'Charging', value: 'USB-C' },
      { label: 'Connectivity', value: 'Bluetooth 5.3' },
      { label: 'Finish', value: 'Midnight navy' },
      { label: 'Water resistance', value: 'IPX4 (sample)' },
    ],
    featured: true,
  },
  {
    id: 'kz-009',
    slug: 'wave-portable-speaker',
    name: 'Wave Portable Speaker',
    category: 'audio',
    price: 2199,
    image: '/images/products/speaker.webp',
    imageAlt: 'Wave portable Bluetooth speaker in navy fabric',
    tagline: 'Portable Bluetooth speaker · 12-hour battery',
    description:
      'A portable speaker with a woven fabric finish and a balanced sound profile for small rooms and outdoor afternoons. Sample product data for demonstration.',
    highlights: [
      'Rich, room-filling sound',
      'Woven fabric finish with a carry loop',
      'Up to 12 hours of playback (sample)',
      'Simple top-panel controls',
    ],
    specs: [
      { label: 'Type', value: 'Portable Bluetooth speaker' },
      { label: 'Battery', value: 'Up to 12 hours (sample)' },
      { label: 'Charging', value: 'USB-C' },
      { label: 'Connectivity', value: 'Bluetooth 5.2' },
      { label: 'Water resistance', value: 'IPX5 (sample)' },
      { label: 'Finish', value: 'Navy woven fabric' },
    ],
    featured: true,
  },
  {
    id: 'kz-010',
    slug: 'orbit-watch-series-5',
    name: 'Orbit Watch Series 5',
    category: 'smartwatches',
    price: 4499,
    image: '/images/products/smartwatch.webp',
    imageAlt: 'Orbit Watch Series 5 smartwatch with a navy sport band',
    tagline: 'Always-on display · Health tracking · GPS',
    description:
      'A smartwatch that keeps notifications, activity and everyday health insights within a glance. Sample product data for demonstration purposes.',
    highlights: [
      'Bright always-on display',
      'Everyday activity and workout tracking',
      'Built-in GPS for outdoor sessions',
      'Interchangeable navy sport band',
    ],
    specs: [
      { label: 'Case', value: 'Graphite aluminium' },
      { label: 'Display', value: 'Always-on OLED' },
      { label: 'Sensors', value: 'Heart rate, GPS, accelerometer (sample)' },
      { label: 'Battery', value: 'Up to 2 days (sample)' },
      { label: 'Water resistance', value: '5 ATM (sample)' },
      { label: 'Band', value: 'Navy fluoroelastomer' },
    ],
    featured: true,
  },
  {
    id: 'kz-012',
    slug: 'volt-20k-power-bank',
    name: 'Volt 20K Power Bank',
    category: 'accessories',
    price: 899,
    image: '/images/products/power-bank.webp',
    imageAlt: 'Volt 20K power bank in navy with USB-C and USB-A ports',
    tagline: '20,000 mAh · Dual USB-C · Fast charge',
    description:
      'A high-capacity power bank for keeping phones, earbuds and other devices charged through a long day. Sample product data for demonstration purposes.',
    highlights: [
      '20,000 mAh capacity',
      'Two USB-C ports and a USB-A port',
      'Compact, pocketable body',
      'Clear battery indicator',
    ],
    specs: [
      { label: 'Capacity', value: '20,000 mAh' },
      { label: 'Ports', value: 'USB-C ×2, USB-A ×1' },
      { label: 'Output', value: 'Up to 30 W (sample)' },
      { label: 'Finish', value: 'Navy' },
      { label: 'Cable included', value: 'USB-C to USB-C (sample)' },
      { label: 'Weight', value: 'Approx. 360 g (sample)' },
    ],
    featured: true,
  },
  {
    id: 'kz-013',
    slug: 'braided-usb-c-cable',
    name: 'Braided USB-C Cable',
    category: 'accessories',
    price: 249,
    image: '/images/products/usb-c-cable.webp',
    imageAlt: 'Coiled navy braided USB-C cable with metal connectors',
    tagline: '1.5 m · Braided · 100 W charging',
    description:
      'A durable braided USB-C cable for charging and data transfer, with a tidy leather-style cable tie. Sample product data.',
    highlights: [
      '1.5 m length for flexible use',
      'Reinforced braided exterior',
      'Supports up to 100 W charging (sample)',
      'Includes a cable tie',
    ],
    specs: [
      { label: 'Length', value: '1.5 m' },
      { label: 'Connectors', value: 'USB-C to USB-C' },
      { label: 'Power', value: 'Up to 100 W (sample)' },
      { label: 'Data', value: 'USB 2.0' },
      { label: 'Finish', value: 'Navy braid' },
      { label: 'Warranty', value: 'To be confirmed' },
    ],
  },
  {
    id: 'kz-014',
    slug: 'compact-30w-charger',
    name: 'Compact 30W Charger',
    category: 'accessories',
    price: 449,
    image: '/images/products/charger.webp',
    imageAlt: 'Compact white USB-C wall charger on a light surface',
    tagline: 'USB-C · 30 W · Foldable pins',
    description:
      'A small wall charger for phones, tablets and earbuds, sized for travel. Sample product data for demonstration purposes.',
    highlights: [
      '30 W USB-C power delivery (sample)',
      'Compact, travel-friendly body',
      'Foldable plug pins',
      'Works with a range of USB-C devices',
    ],
    specs: [
      { label: 'Ports', value: 'USB-C ×1' },
      { label: 'Output', value: '30 W (sample)' },
      { label: 'Input', value: '100–240 V' },
      { label: 'Plug', value: 'Foldable pins' },
      { label: 'Finish', value: 'White' },
      { label: 'Cable included', value: 'No' },
    ],
  },
  {
    id: 'kz-015',
    slug: 'shield-silicone-case',
    name: 'Shield Silicone Case',
    category: 'accessories',
    price: 349,
    image: '/images/products/phone-case.webp',
    imageAlt: 'Navy silicone phone case shown from the back',
    tagline: 'Soft-touch silicone · Raised camera rim',
    description:
      'A soft-touch silicone case with a raised camera rim and a comfortable, slim profile. Sample product data; shown for demonstration only.',
    highlights: [
      'Soft-touch silicone finish',
      'Raised rim around the camera',
      'Slim, pocket-friendly profile',
      'Easy to fit and remove',
    ],
    specs: [
      { label: 'Material', value: 'Silicone' },
      { label: 'Finish', value: 'Matte navy' },
      { label: 'Camera protection', value: 'Raised rim' },
      { label: 'Compatibility', value: 'Sample model (to be confirmed)' },
      { label: 'Colour', value: 'Navy' },
      { label: 'Warranty', value: 'To be confirmed' },
    ],
  },
];

export const featuredProducts = products.filter((product) => product.featured);

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameCategory = products.filter(
    (candidate) => candidate.category === product.category && candidate.id !== product.id,
  );
  const others = products.filter(
    (candidate) => candidate.category !== product.category && candidate.id !== product.id,
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export const priceRange = {
  min: Math.min(...products.map((product) => product.price)),
  max: Math.max(...products.map((product) => product.price)),
};
