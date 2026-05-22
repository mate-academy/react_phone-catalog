import { useState } from 'react';

export function useLocalStorage<T>(key: string, startValue: T): [T, (value: T) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data == null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      console.error(e);
      return startValue;
    }
  });

  const save = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(startValue));
    setValue(newValue);
  };

  return [value, save];
}
