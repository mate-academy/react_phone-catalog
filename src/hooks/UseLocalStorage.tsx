import { useEffect, useState } from 'react';

function UseLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);

    if (jsonValue) {
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

  return [value, setValue] as [typeof value, typeof setValue];
}

export default UseLocalStorage;
