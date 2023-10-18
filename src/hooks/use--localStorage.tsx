import { useState } from 'react';

export const useLocalStorage = (key: string, initialValue: any) => {
  const [value, serValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || initialValue);
    } catch {
      return initialValue;
    }
  });

  const save = (newValue: any) => {
    serValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, save];
};
