import { CartItem } from '../types/CartItem';

export const getCartPrice = (
  cartProduct: CartItem[],
) => {
  const totalPrice = cartProduct.reduce((total, currentItem) => (
    currentItem.product.price * currentItem.quantity + total
  ), 0);

  return totalPrice;
};
