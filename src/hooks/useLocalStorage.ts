/* eslint-disable max-len */
import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
const isFunction = (value: any): value is Function =>
  typeof value === 'function';

export function useLocalStorage<T>(
  key: string,
  startValue: T,
): [T, (V: T | ((K: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
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

  const save = (newValue: T | ((prevValue: T) => T)) => {
    if (isFunction(newValue)) {
      setValue(prev => {
        localStorage.setItem(key, JSON.stringify(newValue(prev)));

        return newValue(prev);
      });
    } else {
      setValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  };

  return [value, save];
}
