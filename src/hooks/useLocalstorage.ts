/* eslint-disable @typescript-eslint/no-shadow */
import { useState } from 'react';
import { Cart } from '../types/Cart';

type Setter = [Cart[], (val: Cart[]) => void];

export const useLocalstorage
= (key: string, initialValue: Cart[]): Setter => {
  const [value, setValue] = useState<Cart[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || '') || initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (value: Cart[]) => {
    setValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [value, save];
};
