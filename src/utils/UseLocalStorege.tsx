import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  const [value, setValue] = useState(() => {
    const date = localStorage.getItem(key);

    if (!date) {
      return initialValue;
    }

    try {
      return JSON.parse(date);
    } catch (e) {
      return initialValue;
    }
  });

  const save = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, save];
}
