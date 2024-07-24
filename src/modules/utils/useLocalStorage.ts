import { useState } from 'react';

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState(() => {
    const savedValue = localStorage.getItem(key);

    return savedValue === null ? defaultValue : JSON.parse(savedValue);
  });

  function save(newValue: T) {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  }

  return [value, save] as const;
}
