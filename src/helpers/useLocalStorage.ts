import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  startValue: T,
): [T, (value: T) => void] {
  const [data, setData] = useState(() => {
    const dataFromStorage = localStorage.getItem(key);

    if (dataFromStorage === null) {
      return startValue;
    }

    try {
      return JSON.parse(dataFromStorage);
    } catch {
      return startValue;
    }
  });

  const save = (newData: T) => {
    localStorage.setItem(key, JSON.stringify(newData));
    setData(newData);
  };

  return [data, save];
}
