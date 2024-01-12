import { CartType } from '../types/CartInterface';

export function getTotalSumCart(cart: CartType[]) {
  return cart.reduce((prev, item) => prev + (item.price * item.count), 0);
}
