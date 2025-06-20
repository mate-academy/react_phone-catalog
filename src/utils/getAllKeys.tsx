import { Product } from '../types/Product';

export const getAllKeys = () => {
  const elements: Product[] = [];

  for (let y = 0; y < localStorage.length; y++) {
    const key = localStorage.key(y);

    if (key === 'cart') {
      continue;
    }

    if (key) {
      const value: Product[] = JSON.parse(localStorage.getItem(key) || '[]');

      elements.push(...value);
    }
  }

  return elements;
};
