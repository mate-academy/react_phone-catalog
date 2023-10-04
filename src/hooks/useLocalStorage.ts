import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  startValue: T[],
): [T[], (v: T[]) => void] {
  const [value, setValue] = useState(() => {
    const localData = localStorage.getItem(key);

    if (localData === null) {
      return startValue;
    }

    try {
      return JSON.parse(localData) as T[];
    } catch (e) {
      return startValue;
    }
  });

  const save = (newValue: T[]) => {
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Product adding failed');
    }
  };

  return [value, save];
}
