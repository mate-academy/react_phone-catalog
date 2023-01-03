import { useState } from 'react';
import { Product } from '../types/Product';

type LocalStorageType = (
  key: string,
  initialValue: []
) => [value: [], setValue: (value: Product []) => void];

export const useLocalStorage: LocalStorageType = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || '') || initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const save = (item: Product[]) => {
    setValue(item);
    localStorage.setItem(key, JSON.stringify(item));
  };

  return [value, save];
};
