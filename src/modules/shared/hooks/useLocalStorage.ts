import { useState } from 'react';

export function useLocalStorage<T>(
  initialValue: T,
  key: string,
): [T, (newValue: T) => void] {
  const [value, setValue] = useState<T>(() => {
    const savedData = localStorage.getItem(key);

    if (!savedData) {
      return initialValue;
    }

    try {
      return JSON.parse(savedData);
    } catch {
      localStorage.removeItem(key);

      return initialValue;
    }
  });

  const saveValue = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, saveValue];
}
