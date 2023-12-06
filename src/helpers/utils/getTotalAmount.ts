import { CartItem } from '../types/CartItem';

export const getTotalQuantity = (cart: CartItem[]) => {
  return cart.reduce((totalQuantity, cartItem) => {
    return totalQuantity + cartItem.quantity;
  }, 0);
};

export const getTotalPrice = (cart: CartItem[]) => {
  return cart.reduce((totalPrice, cartItem) => {
    return totalPrice + cartItem.quantity * cartItem.product.price;
  }, 0);
};
