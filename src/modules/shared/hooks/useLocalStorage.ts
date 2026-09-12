import { useEffect, useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  /** Drops entries an older build may have written in a different shape. */
  sanitize?: (parsed: unknown) => T,
) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key);

      if (!saved) {
        return initialValue;
      }

      const parsed: unknown = JSON.parse(saved);

      return sanitize ? sanitize(parsed) : (parsed as T);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
