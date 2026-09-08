import { useState } from 'react';

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState(() => {
    const savedValue = localStorage.getItem(key);

    if (savedValue === null) {
      localStorage.setItem(key, JSON.stringify(defaultValue));

      return JSON.parse(localStorage.getItem(key) as string);
    } else {
      return JSON.parse(savedValue);
    }
  });

  function saveNewValue(newValue: T) {
    setValue(newValue);

    localStorage.setItem(key, JSON.stringify(newValue));
  }

  return [value, saveNewValue] as const;
}
