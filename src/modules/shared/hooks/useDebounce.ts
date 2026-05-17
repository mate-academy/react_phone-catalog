import { useEffect, useRef, useState } from 'react';

export const useDebounce = <T>(value: T, interval: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDebounceValue(value);
    }, interval);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, interval]);

  return debounceValue;
};
