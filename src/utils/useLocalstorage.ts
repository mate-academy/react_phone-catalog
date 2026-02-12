import { useState, SetStateAction, Dispatch } from 'react';

export function useLocalStorage<T>(
  key: string,
  startValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState(() => {
    const oldValue = localStorage.getItem(key);

    if (oldValue === null) {
      return startValue;
    }

    try {
      return JSON.parse(oldValue);
    } catch (e) {
      localStorage.removeItem(key);

      return startValue;
    }
  });

  const save: Dispatch<SetStateAction<T>> = newValueOrFn => {
    setValue((prevValue: T) => {
      const newValue =
        typeof newValueOrFn === 'function'
          ? (newValueOrFn as (prev: T) => T)(prevValue)
          : newValueOrFn;

      localStorage.setItem(key, JSON.stringify(newValue));

      return newValue;
    });
  };

  return [value, save];
}
