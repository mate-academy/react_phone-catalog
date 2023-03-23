import { useState } from 'react';

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] => {
  const [value, setValue] = useState<T>(
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    JSON.parse(localStorage.getItem(key)!) || initialValue,
  );

  const save = (storageValue: T) => {
    setValue(storageValue);

    localStorage.setItem(key, JSON.stringify(storageValue));
  };

  return [value, save];
};
