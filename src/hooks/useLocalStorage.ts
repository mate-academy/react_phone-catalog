import React, { useState, useEffect } from 'react';

import { useErrorHandler } from '../utils/errors';

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const { handleError } = useErrorHandler();

  const readValue = () => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);

      if (!item) {
        return initialValue;
      }

      try {
        return JSON.parse(item);
      } catch {
        return item as unknown as T;
      }
    } catch (error) {
      handleError('LOCAL_STORAGE_READ', error);

      return initialValue;
    }
  };

  const [value, setValue] = useState<T>(readValue);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      handleError('LOCAL_STORAGE_WRITE', error);
    }
  }, [key, value, handleError]);

  return [value, setValue];
}
