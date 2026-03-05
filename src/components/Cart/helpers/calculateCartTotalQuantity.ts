import type { CartItem } from '@/types/Book';

export const calculateCartTotalQuantity = (cart: CartItem[]): number =>
  cart.reduce((sum, book) => sum + book.quantity, 0);
