import { CartItemType } from '../types/CartItem';

export const saveCartItems = (
  key: string,
  cartItems: CartItemType[],
) => {
  return localStorage.setItem(key, JSON.stringify(cartItems));
};
