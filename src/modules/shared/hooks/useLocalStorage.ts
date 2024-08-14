import { useEffect, useState } from 'react';

export const useLocalStorage = <T>(
  key: string,
  defaultValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const storageValue = localStorage.getItem(key);
  const initialValue: T = storageValue
    ? JSON.parse(storageValue)
    : defaultValue;
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
