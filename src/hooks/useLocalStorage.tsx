import { useEffect, useState } from 'react';
import { Product } from '../types/Product';

export const useLocalStorage = (key: string, initialValue: Product[]) => {
  const getValue = () => {
    const storage = localStorage.getItem(key);

    if (storage) {
      return JSON.parse(storage);
    }

    return initialValue;
  };

  const [value, setValue] = useState<Product[]>(getValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};
