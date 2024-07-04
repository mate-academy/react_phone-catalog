import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
): [T, (v: T) => void] {
  const getInitialValue = (): T => {
    const savedValue = localStorage.getItem(key);

    if (savedValue === null) {
      localStorage.setItem(key, JSON.stringify([]));

      return defaultValue;
    }

    try {
      return JSON.parse(savedValue);
    } catch (error) {
      localStorage.removeItem(key);

      return defaultValue;
    }
  };

  const [value, setValue] = useState<T>(getInitialValue());

  const save = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, save];
}
