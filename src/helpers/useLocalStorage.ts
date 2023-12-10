import { useCallback, useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  startValue: T,
): [T, ((v: T) => void)] {
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

  const save = useCallback((newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  }, [key]);

  return [value, save];
}
