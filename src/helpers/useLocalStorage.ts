import { useState } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T):
[T, (data: T) => void] => {
  const [value, setValue] = useState<T>(() => {
    const item = window.localStorage.getItem(key);

    return item ? JSON.parse(item) : initialValue;
  });

  const save = (data: T) => {
    setValue(data);
    window.localStorage.setItem(key, JSON.stringify(data));
  };

  return [value, save];
};
