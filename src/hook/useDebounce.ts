import { useEffect, useState } from 'react';

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const intervalId = setInterval(() => setDebounceValue(value), delay);

    return () => clearInterval(intervalId);
  }, [value, delay]);

  return debouceValue;
};
