import { CartType } from '../types/CartInterface';

export function totalCountInCart(cart: CartType[]) {
  return cart.reduce((prev, item) => prev + item.count, 0);
}
