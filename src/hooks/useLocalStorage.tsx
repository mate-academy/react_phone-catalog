import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);

      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      localStorage.removeItem(key);
      alert(`Error reading localStorage key "${key}": ${error}`);

      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      throw new Error(`Error saving localStorage key "${key}": ${error}`);
    }
  }, [key, value]);

  return [value, setValue] as const;
}
