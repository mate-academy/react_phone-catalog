// src/utils/useDebouncedValue.ts - Hook for debouncing values
import { useEffect, useState } from 'react';

export function useDebouncedValue<T>(value: T, delay = 500): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delay);

    return () => window.clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
