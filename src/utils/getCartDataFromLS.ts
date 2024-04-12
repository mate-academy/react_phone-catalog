import { CartItem } from '../features/cart/types';
// import { calcTotalCartPrice } from './calcTotalCartPrice';

export const getCartFromLS = (): CartItem[] => {
  // const data = localStorage.getItem('cart');
  // const items = data ? JSON.parse(data) : [];
  // // const totalPrice = calcTotalCartPrice(items);

  // return {
  //   cartItems: items as CartItem[],
  //   // totalPrice,
  // };
  const data = localStorage.getItem('cart');

  return data
    ? JSON.parse(data)
    : [];
};
