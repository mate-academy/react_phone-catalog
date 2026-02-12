import { useEffect, useState, Dispatch, SetStateAction } from 'react';

const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    const data = localStorage.getItem(key);

    if (!data) {
      return initialValue;
    }

    try {
      return JSON.parse(data);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
