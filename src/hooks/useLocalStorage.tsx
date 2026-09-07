import { useEffect, useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const getValue = (): T => {
    const storage = localStorage.getItem(key);

    try {
      return storage ? JSON.parse(storage) : initialValue;
    } catch {
      return initialValue;
    }
  };

  const [value, setValue] = useState<T>(getValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
