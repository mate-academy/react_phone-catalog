import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay = 500) {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounced;
}
