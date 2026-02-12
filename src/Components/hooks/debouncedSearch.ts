import { useEffect, useState } from 'react';

export const DebouncedSearch = <T>(value: T, delay: number) => {
  const [debounce, setDebounce] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounce(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay, value]);

  return debounce;
};
