import { Product } from '../types/Product';
import { getAllKeys } from './getAllKeys';

export const deleteElement = (object: Product) => {
  for (let y = 0; y < localStorage.length; y++) {
    const key = localStorage.key(y);

    if (key === 'cart' || key === null) {
      continue;
    }

    const value: Product[] = JSON.parse(localStorage.getItem(key) || '[]');

    if (value.some(el => el.id === object.id)) {
      const updatedStorage = value.filter(el => el.id !== object.id);

      window.dispatchEvent(new CustomEvent('favouritesChanged'));
      localStorage.setItem(key, JSON.stringify(updatedStorage));
    }
  }

  return getAllKeys();
};
