import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const data = localStorage.getItem(key);

      if (data) {
        return JSON.parse(data);
      }

      return initialValue;
    } catch (e) {
      return initialValue;
    }
  });

  const save = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, save] as const;
}
