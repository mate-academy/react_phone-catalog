import { Dispatch, SetStateAction, useState } from 'react';
type StoredData<T> = T;

export function useLocalStorage<T>(
  key: string,
  startValue: T,
): [StoredData<T>, Dispatch<SetStateAction<T>>] {
  const [storedValue, setValue] = useState<StoredData<T>>(() => {
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

  const save = (value: T | ((prevState: T) => T)) => {
    const updatedNewValue =
      value instanceof Function ? value(storedValue) : storedValue;

    localStorage.setItem(key, JSON.stringify(updatedNewValue));
    setValue(updatedNewValue);
  };

  return [storedValue, save];
}
