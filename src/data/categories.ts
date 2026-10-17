/**
 * Category content for the Kelly Zambia demo.
 *
 * These categories are proposed for the demo experience — they are not a
 * confirmed statement of Kelly Zambia's actual inventory. Edit this file to
 * change category names, copy, imagery or order.
 */

import { assetUrl } from '../lib/format';

export const categories = [
  {
    slug: 'smartphones',
    name: 'Smartphones',
    shortName: 'Phones',
    image: assetUrl('/images/products/smartphone-navy.webp'),
    imageAlt: 'Modern navy smartphone photographed on a light studio background',
    description: 'Everyday phones for staying connected, capturing moments and getting things done.',
    blurb: 'Connect, capture and stay on top of every day.',
  },
  {
    slug: 'laptops',
    name: 'Laptops & Computers',
    shortName: 'Laptops',
    image: assetUrl('/images/products/laptop-silver.webp'),
    imageAlt: 'Slim silver laptop open on a light studio background',
    description: 'Portable computers for work, study, creativity and everything in between.',
    blurb: 'Work, study and create on the move.',
  },
  {
    slug: 'tablets',
    name: 'Tablets',
    shortName: 'Tablets',
    image: assetUrl('/images/products/tablet.webp'),
    imageAlt: 'Navy tablet with a stylus on a warm grey studio background',
    description: 'Lightweight screens for reading, notes, streaming and productivity.',
    blurb: 'A bigger canvas for notes, ideas and entertainment.',
  },
  {
    slug: 'audio',
    name: 'Audio & Headphones',
    shortName: 'Audio',
    image: assetUrl('/images/products/headphones.webp'),
    imageAlt: 'Matte black over-ear headphones with navy cushions',
    description: 'Headphones, earbuds and speakers for work, travel and time out.',
    blurb: 'Sound for focus, travel and time out.',
  },
  {
    slug: 'smartwatches',
    name: 'Smartwatches',
    shortName: 'Watches',
    image: assetUrl('/images/products/smartwatch.webp'),
    imageAlt: 'Smartwatch with a navy sport band and dark case',
    description: 'Wearables that keep useful information within a glance.',
    blurb: 'Useful information, right on your wrist.',
  },
  {
    slug: 'accessories',
    name: 'Accessories',
    shortName: 'Accessories',
    image: assetUrl('/images/products/accessories.webp'),
    imageAlt: 'Flat lay of a power bank, cable, charger and phone case',
    description: 'Chargers, cables, cases, power banks and the small things that matter.',
    blurb: 'The everyday extras that keep devices ready.',
  },
] as const;

export type Category = (typeof categories)[number];
export type CategorySlug = Category['slug'];

export const categorySlugs = categories.map((category) => category.slug);

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function isCategorySlug(value: string | null): value is CategorySlug {
  return !!value && categorySlugs.includes(value as CategorySlug);
}
