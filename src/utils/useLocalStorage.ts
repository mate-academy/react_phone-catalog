import { Dispatch, SetStateAction, useState } from 'react';

type SetValue<T> = Dispatch<SetStateAction<T>>;

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, SetValue<T>] => {
  const [value, setValue] = useState<T>(
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    JSON.parse(localStorage.getItem(key)!) || initialValue,
  );

  const save = (storageValue: ((prev: T) => T) | T) => {
    let result = [] as never as T;

    setValue(prev => {
      if (typeof storageValue === 'function') {
        const fn = storageValue as ((prev: T) => T);

        result = fn(prev);
        localStorage.setItem(key, JSON.stringify(result));

        return result;
      }

      result = storageValue;
      localStorage.setItem(key, JSON.stringify(storageValue));

      return storageValue;
    });
  };

  return [value, save];
};
