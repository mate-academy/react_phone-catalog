import React, { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  startValue: T,
): [T, (val: React.SetStateAction<T>) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      return startValue;
    }
  });

  const save = (newValue: React.SetStateAction<T>) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, save];
}
