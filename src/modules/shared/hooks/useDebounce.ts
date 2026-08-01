import { useEffect, useState } from 'react';

/**
 * Returns `value` only after it has stopped changing for `delay` ms, so a
 * field can update on every keystroke while its effects run once.
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};
