import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  startValue: T,
): [T, (v: T | ((prevValue: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      localStorage.removeItem(key);

      return startValue;
    }
  });

  const save = (newValue: T | ((prevValue: T) => T)) => {
    if (typeof newValue === 'function') {
      setValue(prevValue => {
        const result = (newValue as (prevValue: T) => T)(prevValue);

        localStorage.setItem(key, JSON.stringify(result));

        return result;
      });
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    }
  };

  return [value, save];
}
