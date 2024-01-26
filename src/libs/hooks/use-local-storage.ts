import { useState } from 'react';

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, (v: T) => void] => {
  const [value, setValue] = useState(() => {
    try {
      const data = localStorage.getItem(key);

      return data ? JSON.parse(data) : initialValue;
    } catch {
      localStorage.removeItem(key);

      return initialValue;
    }
  });

  const save = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, save];
};
