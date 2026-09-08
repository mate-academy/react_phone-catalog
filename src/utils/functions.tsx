import { CartItem } from './types';

export function findMaxId(cart: CartItem[] | []) {
  if (cart.length === 0) {
    return 1;
  }

  return Math.max(...cart.map((item: CartItem) => item.id)) + 1;
}

export function calculateTotalPrice(cart: CartItem[]) {
  let total = 0;

  cart.forEach(item => {
    total += item.quantity * item.product.price;
  });

  return total;
}

export function calculateTotalAmount(cart: CartItem[]) {
  let total = 0;

  cart.forEach(item => {
    total += item.quantity;
  });

  return total;
}
