import { useState } from 'react';
import { Product } from '../types/Product';

export function useLocalStorage(key: string, initialValue: Product[]) {
  const [value, setValue] = useState(() => {
    try {
      const parsedValue = localStorage.getItem(key);

      return parsedValue ? JSON.parse(parsedValue) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (newValue: Product) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, save];
}
