import { useState } from 'react';

export function useLocaleStorage<T>(
  key: string,
  startValue: T,
): [T, (v: T | ((v: T) => T)) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      localStorage.removeItem(key);

      return startValue;
    }
  });

  const save = (newValue: T | ((v: T) => T)) => {
    const valueToStore =
      newValue instanceof Function ? newValue(value) : newValue;

    localStorage.setItem(key, JSON.stringify(valueToStore));
    setValue(newValue);
  };

  return [value, save];
}
