import { useState } from 'react';

export function useLocaleStorage<P>(key: string, defaultValue: P) {
  const [value, setValue] = useState(() => {
    const storagedVal = localStorage.getItem(key);

    if (storagedVal === null) {
      return defaultValue;
    }

    try {
      return JSON.parse(storagedVal);
    } catch {
      return defaultValue;
    }
  });

  const saveInStorage = (newValue: P) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, saveInStorage] as const;
}
