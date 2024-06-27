import { CartItem } from '../types/CartItem';

export function getNewCartItemId(cartItems: CartItem[]) {
  if (cartItems.length === 0) {
    return 0;
  }

  const maxId = Math.max(...cartItems.map(item => item.id));

  return maxId + 1;
}
