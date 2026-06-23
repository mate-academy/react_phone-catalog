import { useEffect, useState } from 'react';

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const savedValue = localStorage.getItem(key);

      return savedValue ? JSON.parse(savedValue) : defaultValue;
    } catch (error) {
      localStorage.removeItem(key);
      // eslint-disable-next-line no-console
      console.warn(`Error reading localStorage key "${key}": ${error}`);

      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      throw new Error(`Error saving to localStorage key "${key}": ${error}`);
    }
  }, [key, value]);

  return [value, setValue] as const;
};
