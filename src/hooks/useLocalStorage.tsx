// type SetValue<T> = (value: T | ((prev: T) => T)) => void;

import { useState } from 'react';

export function useLocalStorage<T>(key: string, startValue: T):
[T, (v: T) => void] {
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

  const save = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));

    setValue(newValue);
  };

  return [value, save];
}

// const data = localStorage.getItem(key);
// const initial = data ? JSON.parse(data) : startValue;

// const [value, setValue] = useState<T>(initial);

// const setStoredValue: SetValue<T> = (newValue) => {
//   const valueToStore = newValue instanceof Function
//     ? newValue(value) : newValue;

//   setValue(valueToStore);
//   localStorage.setItem(key, JSON.stringify(valueToStore));
// };

// return [value, setStoredValue];
