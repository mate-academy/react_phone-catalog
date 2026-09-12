import {useCallback, useState} from 'react';

export function useLocaleStorage<T>(
  key: string,
  startValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data) as T;
    } catch {
      localStorage.removeItem(key);

      return startValue;
    }
  });

  const save = useCallback(
    (newValue: React.SetStateAction<T>) => {
      setValue(currentValue => {
        const resolvedValue =
          typeof newValue === 'function'
            ? (newValue as (value: T) => T)(currentValue)
            : newValue;

        localStorage.setItem(key, JSON.stringify(resolvedValue));

        return resolvedValue;
      });
    },
    [key],
  );

  return [value, save];
}
