import { useState } from 'react';

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = useState(() => {
    try {
      const savedValue = localStorage.getItem(key);

      return savedValue ? JSON.parse(savedValue) : defaultValue;
    } catch (error) {
      localStorage.removeItem(key);

      return defaultValue;
    }
  });

  const save = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, save] as const;
};
