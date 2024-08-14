import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  startValue: T,
): [T, (v: T) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (!data) {
      localStorage.setItem(key, JSON.stringify(startValue));

      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      return startValue;
    }
  });

  const save = (newValue: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    } catch (e) {
      return 'startValue';
    }

    return newValue;
  };

  return [value, save];
}
