import { useState } from 'react';

export function useLocaleStorage<T>(
  key: string,
  startValue: T,
): [T, (v: T) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      localStorage.removeItem(key);

      return startValue;
    }
  });

  const save = (NewValue: T) => {
    localStorage.setItem(key, JSON.stringify(NewValue));
    setValue(NewValue);
  };

  return [value, save];
}
