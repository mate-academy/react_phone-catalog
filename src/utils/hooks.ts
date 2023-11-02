import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LocaleStorageTypes } from '../types/LocaleStorageTypes';

export const useUpdateSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearch = (params: {
    [key: string]: number[] | string[] | string | null
  }) => {
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        searchParams.delete(key);
      } else if (Array.isArray(value)) {
        searchParams.delete(key);

        value.forEach(part => {
          searchParams.append(key, String(part));
        });
      } else {
        searchParams.set(key, value);
      }

      setSearchParams(searchParams);
    });
  };

  return { updateSearch, searchParams };
};

export function useLocaleStorage<T>(
  key: LocaleStorageTypes,
  startValue: T,
): [T, (v: T) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch {
      return startValue;
    }
  });

  const save = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, save];
}
