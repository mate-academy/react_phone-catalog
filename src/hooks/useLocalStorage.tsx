import { useState } from 'react';

export const useLocalStorage = (initialValue: [], key: string) => {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || '[]');
    } catch {
      return initialValue;
    }
  });

  const save = (newValue: string[]) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, save];
};
