import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  startValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState(() => {
    const item = localStorage.getItem(key);

    return item ? JSON.parse(item) : startValue;
  });

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;

    setStoredValue(valueToStore);
    localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue];
}
