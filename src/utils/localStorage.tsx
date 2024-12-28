import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      throw new Error(`Error reading localStorage key "${key}": ${error}`);
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
}
