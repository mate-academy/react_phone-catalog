/* eslint-disable no-console */
import { Product } from '../components/ProductCarousel';

const CART_KEY = 'cart';

export const loadCart = (): Product[] => {
  try {
    const raw = localStorage.getItem(CART_KEY);

    if (!raw) {
      return [];
    }

    return JSON.parse(raw);
  } catch (e) {
    console.error('loadCart error', e);

    return [];
  }
};

export const saveCart = (product: Product[]) => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(product));
  } catch (e) {
    console.error('saveCart error', e);
  }
};
