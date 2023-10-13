import { useState } from 'react';

export const useLocalStorage = (key: string, initialValue = []) => {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);

    if (!item) {
      return initialValue;
    }

    try {
      return JSON.parse(item) || initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (localStorageValue: []) => {
    setValue(localStorageValue);
    localStorage.setItem(key, JSON.stringify(localStorageValue));
  };

  return [value, save];
};
