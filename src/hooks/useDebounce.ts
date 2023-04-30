import { useEffect, useState } from 'react';

export const useDebounce = (value: string, delay = 300) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, Math.max(delay, 0));

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounceValue;
};
