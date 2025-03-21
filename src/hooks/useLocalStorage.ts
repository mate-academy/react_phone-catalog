import { useState } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : initialValue;
  });

  const setData = (v: T) => {
    setValue(v);
    localStorage.setItem(key, JSON.stringify(v));
  };

  return [value, setData];
};
