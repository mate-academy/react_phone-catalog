import { CartItem } from '../contexts/CartContext';

const STORAGE_KEY = 'cart';

export const getStoredCart = (): CartItem[] => {
  const cartItems = localStorage.getItem(STORAGE_KEY);

  return cartItems ? JSON.parse(cartItems) : [];
};

export const saveCartLocalStorage = (cartItems: CartItem[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
};

export const getCart = async (): Promise<CartItem[]> => {
  return getStoredCart();
};

export const setCart = async (cart: CartItem[]) => {
  return saveCartLocalStorage(cart);
};
