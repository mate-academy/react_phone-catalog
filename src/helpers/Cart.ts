import { CartItem } from '../types/Cart';

export const getCart = (): CartItem[] => {
  const cart: string | null = localStorage.getItem('cart');

  if (cart) {
    return JSON.parse(cart);
  }

  return [];
};

export const updateLocalStorage = (items: CartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(items));
};

export const addToCart = (item: CartItem): void => {
  const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');

  const hasItem = cart.some(cartItem => (
    cartItem.product.id === item.product.id
  ));

  if (hasItem) {
    return;
  }

  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const removeFromCart = (item: CartItem): void => {
  let cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');

  cart = cart.filter(({ product }) => product.id !== item.product.id);
  localStorage.setItem('cart', JSON.stringify(cart));
};
