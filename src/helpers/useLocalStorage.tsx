import { useState } from 'react';
import { Product } from '../types/Product';

export const useLocalStorage = (key: string, initialValue: Product[] | []) => {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);

    return item !== null ? JSON.parse(item) : initialValue;
  });

  const save = (valueProp: Product[]) => {
    setValue(value);
    localStorage.setItem(key, JSON.stringify(valueProp));
  };

  return [value, save];
};
