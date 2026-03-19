import { CartEntry } from '../types/CartItem';

export function isItemInCart(items: CartEntry[], itemId: string): boolean {
  return items.some(item => item.id === itemId);
}
