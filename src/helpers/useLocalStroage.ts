import { useState } from 'react';
import { Phone } from '../types/Phone';

export const useLocalStorage = (
  key: string,
  initialValue: Phone[],
): [Phone[],
    (value: Phone[]
    ) => void] => {
  const [value, setValue] = useState<Phone[]>(() => {
    try {
      const data = localStorage.getItem(key);

      return data ? JSON.parse(data) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (data: Phone[]) => {
    setValue(data);
    localStorage.setItem(key, JSON.stringify(data));
  };

  return [value, save];
};
