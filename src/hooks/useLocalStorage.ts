import { useState, useEffect } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => TextEncoderEncodeIntoResult),
) {
  const [value, setVaule] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);

    if (jsonValue != null) {
      return JSON.parse(jsonValue);
    }

    if (typeof initialValue === 'function') {
      return (initialValue as () => T)();
    }

    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setVaule] as [typeof value, typeof setVaule];
}
