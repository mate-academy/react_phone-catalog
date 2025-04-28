import { useState } from 'react';

export const useLocalStorage = <T>(
  defaultValue: T,
  key: string,
): [T, (newValue: T | ((prevState: T) => T)) => void] => {
  const [value, setValue] = useState<T>(() => {
    const savedValue = localStorage.getItem(key);

    if (savedValue === null) {
      localStorage.setItem(key, JSON.stringify(defaultValue));

      return defaultValue;
    }

    try {
      return JSON.parse(savedValue);
    } catch (error) {
      localStorage.removeItem(key);
      localStorage.setItem(key, JSON.stringify(defaultValue));

      return defaultValue;
    }
  });

  const save = (newValue: T | ((prevState: T) => T)) => {
    setValue(prev => {
      const nextValue =
        typeof newValue === 'function'
          ? (newValue as (prevState: T) => T)(prev)
          : newValue;

      localStorage.setItem(key, JSON.stringify(nextValue));

      return nextValue;
    });
  };

  return [value, save] as const;
};
