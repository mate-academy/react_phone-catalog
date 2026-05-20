import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  startValue: T,
): [T, (val: T) => void] {
  const [value, setValue] = useState(() => {
    const valueFromStorage = localStorage.getItem(key);

    if (valueFromStorage === null) {
      return startValue;
    }

    try {
      return JSON.parse(valueFromStorage);
    } catch {
      localStorage.removeItem(key);

      return startValue;
    }
  });

  const save = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, save];
}
