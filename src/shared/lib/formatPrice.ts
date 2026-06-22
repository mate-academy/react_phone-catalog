import {
  Currency,
  CURRENCY_SYMBOLS,
  DEFAULT_CURRENCY,
  FALLBACK_CURRENCY_RATES,
  Language,
} from '@/shared/constants/settings';

export const formatPrice = (
  price: number,
  currency: Currency = DEFAULT_CURRENCY,
  currencyRates = FALLBACK_CURRENCY_RATES,
  language: Language = 'en',
): string => {
  const rate =
    currencyRates[currency] ?? FALLBACK_CURRENCY_RATES[currency] ?? 1;
  const convertedPrice = price * rate;

  const locale = language === 'ua' ? 'uk-UA' : 'en-US';

  const formattedNumber = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  }).format(convertedPrice);

  return `${CURRENCY_SYMBOLS[currency]}${formattedNumber}`;
};
