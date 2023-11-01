import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [
    T,
    (v: T) => void,
  ] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (!data) {
      return initialValue;
    }

    try {
      return JSON.parse(data);
    } catch {
      localStorage.remove(key);

      return initialValue;
    }
  });

  const save = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, save];
}
