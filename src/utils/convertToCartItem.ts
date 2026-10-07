import { CartProduct, Product } from '../types/products';

export const convertToCartItem = (product: Product): CartProduct => {
  const cartItem: CartProduct = {
    ...product,
    quantity: 1,
  };

  return cartItem;
};
