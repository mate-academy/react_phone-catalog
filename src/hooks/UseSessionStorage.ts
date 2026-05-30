import { useState } from 'react';

export function useSessionStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState(() => {
    const savedValue = sessionStorage.getItem(key);

    if (savedValue === null) {
      sessionStorage.setItem(key, JSON.stringify(defaultValue));

      return JSON.parse(sessionStorage.getItem(key) as string);
    } else {
      return JSON.parse(savedValue);
    }
  });

  function saveNewValue(newValue: T) {
    setValue(newValue);

    sessionStorage.setItem(key, JSON.stringify(newValue));
  }

  return [value, saveNewValue] as const;
}
