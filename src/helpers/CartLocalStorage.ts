import { ICart } from "../interfaces/Cart.interface";

export const saveCartToLocalStorage = (items: ICart[], totalPrice: number) => {
  localStorage.setItem('cart', JSON.stringify(items));
  localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
};

export const loadCartFromLocalStorage = () => {
  const items = localStorage.getItem('cart');
  const totalPrice = localStorage.getItem('totalPrice');

  return {
    items: items ? JSON.parse(items) : [],
    totalPrice: totalPrice ? JSON.parse(totalPrice) : 0,
  };
};
