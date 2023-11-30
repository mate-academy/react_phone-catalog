import { useState } from 'react';

export function useLocalStorage(key: string, initialValue: string) {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return initialValue;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      localStorage.removeItem(key);

      return initialValue;
    }
  });

  // save `value` to the `state` and local storage
  const save = (newValue: string) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [value, save];
}
