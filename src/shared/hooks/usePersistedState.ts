import { useState, useEffect } from 'react';
import { getFromStorage, saveToStorage } from '../storage/localStorage';

export function usePersistedState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => {
    return getFromStorage<T>(key) ?? initialValue;
  });

  useEffect(() => {
    saveToStorage(key, state);
  }, [key, state]);

  return [state, setState] as const;
}
