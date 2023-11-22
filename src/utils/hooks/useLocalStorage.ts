import { useState, useEffect } from 'react';

export function useLocalStorage<T>(initialValue: T, key: string):
[T, React.Dispatch<React.SetStateAction<T>>] {
  const getValue = () => {
    const storage = localStorage.getItem(key);

    if (storage) {
      return JSON.parse(storage) as T;
    }

    return initialValue;
  };

  const [value, setValue] = useState(getValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
