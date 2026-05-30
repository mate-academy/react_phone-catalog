import { useState } from 'react';

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      localStorage.setItem(key, JSON.stringify([]));

      return defaultValue;
    }

    try {
      return JSON.parse(data);
    } catch {
      return defaultValue;
    }
  });

  function save(newValue: T | ((prev: T) => T)) {
    setValue((prev: T) => {
      const valueToStore =
        newValue instanceof Function ? newValue(prev) : newValue;

      localStorage.setItem(key, JSON.stringify(valueToStore));

      return valueToStore;
    });
  }

  return [value, save] as [T, React.Dispatch<React.SetStateAction<T>>];
}
