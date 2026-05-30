import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  startValue: T,
): [T, (v: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data) as T;
    } catch {
      localStorage.removeItem(key);

      return startValue;
    }
  });

  const save = (newValue: T | ((prev: T) => T)) => {
    setValue(prev => {
      const valueToStore =
        newValue instanceof Function ? newValue(prev) : newValue;

      localStorage.setItem(key, JSON.stringify(valueToStore));

      return valueToStore;
    });
  };

  return [value, save];
}
