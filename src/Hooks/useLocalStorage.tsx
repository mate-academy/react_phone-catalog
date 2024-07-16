import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  startValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
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
        const updatedValue = (newValue as (prevValue: T) => T)(prevValue);

        localStorage.setItem(key, JSON.stringify(updatedValue));

        return updatedValue;
      });
    } else {
      setValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  };

  return [value, save];
}
