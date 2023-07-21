import { useState } from 'react';
import { Product } from '../types/Product';

export const useLocalStorage = (
  key: string,
  initialValue: Product[],
) => {
  const [value, setValue] = useState(() => {
    try {
      const data = localStorage.getItem(key);

      return data ? JSON.parse(data) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const save = (currentValue: Product) => {
    setValue(currentValue);
    localStorage.setItem(key, JSON.stringify(currentValue));
  };

  return [value, save];
};
