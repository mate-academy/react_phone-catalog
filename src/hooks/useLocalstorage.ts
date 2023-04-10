/* eslint-disable @typescript-eslint/no-shadow */
import { useState } from 'react';

type T = any[];

export const useLocalstorage
= (key: string, initialValue: T): [T, (arg: T) => void] => {
  const [value, setValue] = useState<T[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || '') || initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (value: T) => {
    setValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [value, save];
};
