import { CartItem } from '../types/CartItem';

export const getCartItems = (): CartItem[] => {
  return JSON.parse(localStorage.getItem('cartItems') || '[]');
};

export const saveCartItems = (cartItems: CartItem[]): void => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};
