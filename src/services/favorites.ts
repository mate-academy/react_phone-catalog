/* eslint-disable no-console */
import { Product } from '../components/ProductCarousel';

const FAVORITES_KEY = 'favorites';

export const loadFavorites = (): Product[] => {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);

    if (!raw) {
      return [];
    }

    return JSON.parse(raw);
  } catch (e) {
    console.error('loadFavorites error', e);

    return [];
  }
};

export const saveFavorites = (product: Product[]) => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(product));
  } catch (e) {
    console.error('saveFavorites error', e);
  }
};
