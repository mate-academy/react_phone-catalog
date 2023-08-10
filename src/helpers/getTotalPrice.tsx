import { CartItem } from '../types/CartItem';

export const getTotalPrice = (cartProducts: CartItem[]) => {
  const totalPrice = cartProducts.map(cartProduct => {
    const productPrice = Math.round(cartProduct.product.price
      * (1 - 0.01 * cartProduct.product.discount));

    return productPrice * cartProduct.quantity;
  }).reduce((total, amount) => (
    total + amount), 0);

  return totalPrice;
};
