export const LANGUAGES = [
  { label: 'EN', value: 'en' },
  { label: 'UA', value: 'ua' },
] as const;

export const CURRENCIES = [
  { label: 'USD', value: 'usd' },
  { label: 'EUR', value: 'eur' },
  { label: 'UAH', value: 'uah' },
] as const;

export type Language = (typeof LANGUAGES)[number]['value'];
export type Currency = (typeof CURRENCIES)[number]['value'];

export const DEFAULT_LANGUAGE: Language = 'en';
export const DEFAULT_CURRENCY: Currency = 'usd';

export const LANGUAGE_STORAGE_KEY = 'nice-gadgets-language';
export const CURRENCY_STORAGE_KEY = 'nice-gadgets-currency';

export const FALLBACK_CURRENCY_RATES: Record<Currency, number> = {
  usd: 1,
  eur: 0.92,
  uah: 41,
};

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  usd: '$',
  eur: '€',
  uah: '₴',
};
