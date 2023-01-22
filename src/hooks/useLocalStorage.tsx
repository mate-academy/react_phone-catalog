import { useState } from 'react';
import { Product } from 'src/types/Product';

type InitValue = string;

export function useLocalStorage(key: string, initialValue: InitValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : JSON.parse(initialValue);
    } catch (error) {
      return initialValue;
    }
  });
  const setValue = (value: Product[]) => {
    try {
      const valueToStore
        = value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
    }
  };

  return [storedValue, setValue];
}
