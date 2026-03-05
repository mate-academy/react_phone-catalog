import type { Currency } from '@/types/Currency';

const CURRENCY_SYMBOL: Record<Currency, string> = {
  USD: '$',
  UAH: '₴',
};

export const getCurrencySymbol = (currency: Currency): string =>
  CURRENCY_SYMBOL[currency];

export const convertPrice = (
  amount: number,
  currency: Currency,
  rate: number,
): number => (currency === 'USD' ? amount : Math.round(amount * rate));

export const getItemPrice = (
  item: { priceDiscount: number | null; priceRegular: number },
  currency: Currency,
  rate: number,
): number =>
  convertPrice(item.priceDiscount ?? item.priceRegular, currency, rate);

export const applyDiscount = (
  subtotal: number,
  discount?: number,
): { discountAmount: number; total: number } => {
  if (!discount || discount <= 0) return { discountAmount: 0, total: subtotal };
  const discountAmount = Math.round(subtotal * (discount / 100) * 100) / 100;
  return { discountAmount, total: subtotal - discountAmount };
};
