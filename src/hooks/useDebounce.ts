import { useEffect, useState } from 'react';

export const useDebounce = (value: string, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [value, delay]);

  return debounceValue;
};
