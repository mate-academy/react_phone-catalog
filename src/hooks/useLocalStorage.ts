import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const stored = localStorage.getItem(key);

  const [value, setValue] = useState<T>(() => {
    return stored ? JSON.parse(stored) : initialValue;
  });

  const saveValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, saveValue] as const;
}
