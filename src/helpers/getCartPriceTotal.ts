import { CartsItem } from '../types/CartsItem';

export const getPriceTotalCart = (cartProducts: CartsItem[]) => {
  const totalPrice = cartProducts.reduce((total, cartItem) => (
    cartItem.product.price * cartItem.quantity + total), 0);

  return totalPrice;
};
