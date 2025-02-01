import { CartProduct } from '../types/Context';

export const getTotalProductsInCart = (cartProducts: CartProduct[]) => {
  return cartProducts.reduce((a, b) => a + b.quantity, 0);
};
