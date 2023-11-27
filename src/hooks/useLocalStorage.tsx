import { useState } from 'react';

type ReturnValue<T> = [
  T,
  (newValue: T) => void,
];

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): ReturnValue<T> {
  const [value, setValue] = useState<T>(() => {
    const storedItem = localStorage.getItem(key);

    if (storedItem) {
      return JSON.parse(storedItem);
    }

    return initialValue;
  });

  const saveToStorage = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, saveToStorage];
}
