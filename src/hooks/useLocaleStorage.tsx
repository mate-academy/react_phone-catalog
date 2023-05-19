import { useState } from 'react';
import { Product } from '../types/Product';

export const useLocaleStorage = (key: string, initialValue: Product[]) => {
  const [value, setValue] = useState(() => {
    try {
      const data = localStorage.getItem(key);

      return data ? JSON.parse(data) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (currentValue: Product) => {
    setValue(currentValue);
    localStorage.setItem(key, JSON.stringify(currentValue));
  };

  return [value, save];
};
