import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    const setValue = (value: T) => {
      window.localStorage.setItem(key, JSON.stringify(value));
    };

    if (storedValue) {
      setValue(storedValue);
    }
  }, [storedValue, key]);

  return [storedValue, setStoredValue];
};
