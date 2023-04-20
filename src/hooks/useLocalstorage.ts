/* eslint-disable @typescript-eslint/no-shadow */
import { useState } from 'react';

export const useLocalstorage
= <T>(key: string, initialValue: T[]) => {
  const [value, setValue] = useState<T[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || '') || initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (value: T[]) => {
    setValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return { value, save };
};
