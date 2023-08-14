import { useState } from 'react';
import { Product } from '../types/Product';

export const useLocalStorage = (
  key: string,
  initialValue: Product[],
): [Product[],
    (value: Product[]
    ) => void] => {
  const [value, setValue] = useState<Product[]>(() => {
    try {
      const data = localStorage.getItem(key);

      return data ? JSON.parse(data) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (data: Product[]) => {
    setValue(data);
    localStorage.setItem(key, JSON.stringify(data));
  };

  return [value, save];
};
