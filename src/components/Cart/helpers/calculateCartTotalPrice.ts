import type { CartItem } from '@/types/Book';
import { getItemPrice } from '@/helpers/getItemPrice';
import { roundCurrency } from './roundCurrency';

export const calculateCartTotalPrice = (
  cart: CartItem[],
  currency: string,
  rate: number,
): number =>
  roundCurrency(
    cart.reduce(
      (sum, book) => sum + getItemPrice(book, currency, rate) * book.quantity,
      0,
    ),
  );
