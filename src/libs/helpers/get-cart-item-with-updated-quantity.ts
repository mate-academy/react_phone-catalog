import { ProductInCartType } from '../types';

export const getCartItemWithUpdatedQuantity = (
  cart: ProductInCartType[],
  id: string,
  delta: number,
) => {
  return cart.map(cartItem => (
    cartItem.id === id
      ? {
        ...cartItem,
        quantity: cartItem.quantity + delta,
      }
      : cartItem
  ));
};
