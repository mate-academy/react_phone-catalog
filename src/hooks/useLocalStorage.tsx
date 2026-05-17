import { useState } from 'react';

type SetValue<T> = React.Dispatch<React.SetStateAction<T>>;

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, SetValue<T>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      localStorage.setItem(key, JSON.stringify(initialValue));

      return initialValue;
    }

    try {
      return JSON.parse(data) as T;
    } catch {
      return initialValue;
    }
  });

  const save: SetValue<T> = value => {
    const newValue = value instanceof Function ? value(storedValue) : value;

    setStoredValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [storedValue, save];
}
