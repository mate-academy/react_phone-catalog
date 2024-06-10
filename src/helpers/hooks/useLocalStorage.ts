import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  startValue: T,
): [T, (v: T) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (!data) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch {
      return startValue;
    }
  });

  const save = (newData: T) => {
    setValue(newData);
    localStorage.setItem(key, JSON.stringify(newData));
  };

  return [value, save];
}
