import { useCallback, useState } from 'react';
import { useError } from '../context/ErrorContext';

export function useLocalStorage<T>(
  key: string,
  startValue: T,
): [T, (v: T) => void] {
  const { setError } = useError();
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);

      return storedValue ? JSON.parse(storedValue) : startValue;
    } catch {
      return startValue;
    }
  });

  const save = useCallback(
    (newValue: T) => {
      try {
        localStorage.setItem(key, JSON.stringify(newValue));
        setValue(newValue);
      } catch {
        setError(`Failed to save ${key} in localStorage`);
      }
    },
    [key, setValue, setError],
  );

  return [value, save];
}
