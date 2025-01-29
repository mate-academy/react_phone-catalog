import { getFromLocalStorage, setInLocalStorage } from './api';
import { CartItemType } from '../types/CartItemType';

const CART_KEY = 'cart';

export const addToCart = (itemId: string): void => {
  const cart = getFromLocalStorage(CART_KEY) as CartItemType[];

  const cartItem = cart.find(item => item.itemId === itemId);

  if (cartItem) {
    return;
  }

  cart.push({ itemId, quantity: 1 });

  setInLocalStorage(CART_KEY, cart);
};

export const updateInCart = (itemId: string, quantity: number): void => {
  const cart = getFromLocalStorage(CART_KEY) as CartItemType[];

  const cartItem = cart.find(item => item.itemId === itemId);

  if (!cartItem) {
    return;
  }

  cartItem.quantity = quantity;

  setInLocalStorage(CART_KEY, cart);
};

export const removeFromCart = (itemId: string): void => {
  let cart = getFromLocalStorage(CART_KEY) as CartItemType[];

  cart = cart.filter(item => item.itemId !== itemId);

  setInLocalStorage(CART_KEY, cart);
};

export const isInCart = (itemId: string): boolean => {
  const cart = getFromLocalStorage(CART_KEY) as CartItemType[];

  return !!cart.find(item => item.itemId === itemId);
};

export const getCart = () => {
  return getFromLocalStorage(CART_KEY) as CartItemType[];
};
