import { useState } from 'react';
import { CartItemInfo } from '../types/CartItemInfo';

export const useLocalStorage = (key: string, initialValue: []) => {
  const getDataFromStorage = localStorage.getItem(key);

  const storage
  = getDataFromStorage !== null ? JSON.parse(getDataFromStorage) : initialValue;

  const [value, setValue] = useState(storage);

  const save = (product: CartItemInfo) => {
    setValue(product);
    localStorage.setItem(key, JSON.stringify(product));
  };

  return [value, save];
};
