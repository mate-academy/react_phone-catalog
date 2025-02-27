import { useState } from 'react';
export function useLocaleStorage<T>(
  key: string,
  startValue: T,
): [T, (v: T) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);
    if (data === null) {
      localStorage.setItem(key, JSON.stringify(startValue));
      return startValue;
    }
    try {
      return JSON.parse(data);
    } catch {
      return startValue;
    }
  });
  const save = (newValue: T) => {
    localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };
  return [value, save];
}
