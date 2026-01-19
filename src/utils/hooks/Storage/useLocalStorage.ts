import { useEffect, useState } from 'react';
import { LocalStorageError } from '../../../services/Errors';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);

      return stored ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const [error, setError] = useState<LocalStorageError | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      setError(null);
    } catch {
      setError(new LocalStorageError('UNKNOWN_ERROR'));
    }
  }, [key, value]);

  return {
    value,
    setValue,
    error,
  };
}
