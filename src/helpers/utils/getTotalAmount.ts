import { CartItem } from '../types/CartItem';
import { getDiscountedPrice } from './getDiscount';

export const getTotalQuantity = (cart: CartItem[]) => {
  return cart.reduce((totalQuantity, cartItem) => {
    return totalQuantity + cartItem.quantity;
  }, 0);
};

export const getTotalPrice = (cart: CartItem[]) => {
  return cart.reduce((totalPrice, cartItem) => {
    const discountedPrice = getDiscountedPrice(cartItem.product);

    return totalPrice + cartItem.quantity * discountedPrice;
  }, 0);
};
