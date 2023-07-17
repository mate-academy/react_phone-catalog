import { useState } from 'react';
import { Product } from '../types/Product';

export const useLocalStorage = (key: string, initialValue: Product[]) => {
  const valueFromStorage = localStorage.getItem(key) || '[]';

  const [value, setValue] = useState(
    valueFromStorage ? JSON.parse(valueFromStorage) : initialValue,
  );

  return [value, setValue];
};

/* export const useLocalStorage = (key: string, initialValue: Product[]) => {
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
}; */
