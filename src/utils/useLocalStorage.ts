import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  value: T,
): [T, (v: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : value;
    } catch (error) {
      return value;
    }
  });

  const setValue = (v: T | ((val: T) => T)) => {
    const valueToStore = v instanceof Function ? v(storedValue) : v;

    setStoredValue(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue];
}
