import { useEffect, useState } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const getValue = (): T => {
    try {
      const storage = localStorage.getItem(key);
      if (!storage) {
        return initialValue;
      }
      return JSON.parse(storage);
    } catch {
      return initialValue;
    }
  };

  const [value, setValue] = useState(getValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);
  return [value, setValue] as const;
};
