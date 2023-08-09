import { CartItem } from '../types/CartItem';

export const getTotalPrice = (cartProducts: CartItem[]) => {
  // let totalPrice = 0;
  // let productPrice;

  // // eslint-disable-next-line no-restricted-syntax
  // for (const cartProduct of cartProducts) {
  //   if (cartProduct.product.discount > 0) {
  //     productPrice = Math.round(cartProduct.product.price
  //       * (1 - 0.01 * cartProduct.product.discount));
  //   } else {
  //     productPrice = cartProduct.product.price;
  //   }

  //   totalPrice += productPrice * cartProduct.quantity;
  // }

  const totalPrice = cartProducts.map(cartProduct => {
    const productPrice = Math.round(cartProduct.product.price
      * (1 - 0.01 * cartProduct.product.discount));

    return productPrice * cartProduct.quantity;
  }).reduce((total, amount) => (
    total + amount), 0);

  return totalPrice;
};
