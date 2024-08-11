import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  startValue: T,
): [T, (v: T) => void] {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);

    if (storedValue === null) {
      return startValue;
    }

    try {
      return JSON.parse(storedValue);
    } catch (error) {
      localStorage.removeItem(key);
    }

    return startValue;
  });

  const setStoredValue = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, setStoredValue];
}
