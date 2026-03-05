import type { CartItem } from '@/types/Book';

export const getItemPrice = (
  item: CartItem,
  currency: string,
  rate: number,
): number => {
  const price = item.priceDiscount ?? item.priceRegular;

  return currency === 'USD' ? price : Math.round(price * rate);
};
