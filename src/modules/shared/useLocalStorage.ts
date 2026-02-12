import { useEffect, useState } from 'react';

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = useState(() => {
    const savedValue = localStorage.getItem(key);

    if (savedValue === null) {
      return defaultValue;
    }

    if (!savedValue.length) {
      localStorage.removeItem(key);
    }

    try {
      return JSON.parse(savedValue) as T;
    } catch (error) {
      localStorage.removeItem(key);

      return defaultValue;
    }
  });

  useEffect(() => {
    if (localStorage.getItem(key) === null) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
    }
  }, [key, defaultValue]);

  const save = (newValue: T | ((prev: T) => T)) => {
    setValue(prev => {
      const resolvedValue =
        typeof newValue === 'function'
          ? (newValue as (prev: T) => T)(prev)
          : newValue;

      localStorage.setItem(key, JSON.stringify(resolvedValue));

      return resolvedValue;
    });
  };

  return [value, save] as const;
};
