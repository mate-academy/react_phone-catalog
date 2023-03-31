import { useState } from 'react';
import { Product } from '../types/Product';

export function useLocalStorage(key: string): [
  Product[],
  (item: Product | null) => void,
] {
  const [value, setValue] = useState<Product[]>(() => {
    return JSON.parse(localStorage.getItem(key) || '[]');
  });

  const setStore = (item: Product | null): void => {
    if (!item) {
      return;
    }

    if (value.find(el => el.id === item.id)) {
      const newVal = value.filter(el => el.id !== item.id);

      setValue(newVal);
      /* eslint-disable-next-line */
      newVal.length
        ? localStorage.setItem(key, JSON.stringify(newVal))
        : localStorage.removeItem(key);
    } else {
      const newVal = [...value, item];

      setValue(newVal);
      localStorage.setItem(key, JSON.stringify(newVal));
    }
  };

  return [value, setStore];
}
