const numberFormatter = new Intl.NumberFormat('en-ZM', {
  maximumFractionDigits: 0,
});

/** Formats a whole number as Zambian kwacha, e.g. K 18,499. */
export function formatZMW(value: number): string {
  return `K\u00A0${numberFormatter.format(Math.round(value))}`;
}

export function formatZMWSuffix(value: number): string {
  return `${numberFormatter.format(Math.round(value))} ZMW`;
}

export function pluralise(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : (plural ?? `${singular}s`);
}

export function makeDemoReference(): string {
  const stamp = Date.now().toString().slice(-6);
  return `KZ-DEMO-${stamp}`;
}

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

/** Accepts Zambian or international formats with at least 9 digits. */
export function isPhone(value: string): boolean {
  const digits = value.replace(/[^\d]/g, '');
  return digits.length >= 9 && digits.length <= 15 && /^\+?[\d\s().-]+$/.test(value.trim());
}

/** Prefixes a public asset path with Vite's configured BASE_URL. */
export function assetUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}

