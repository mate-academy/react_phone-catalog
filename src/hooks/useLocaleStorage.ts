/* eslint-disable no-console */
import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const readLocalStorage = (): T => {
    try {
      const item = localStorage.getItem(key);

      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);

      return initialValue;
    }
  };

  const [state, setState] = useState<T>(() => readLocalStorage());

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const prev = readLocalStorage();
      const valueToStore = value instanceof Function ? value(prev) : value;

      localStorage.setItem(key, JSON.stringify(valueToStore));
      setState(valueToStore);
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  const remove = () => {
    try {
      localStorage.removeItem(key);
      setState(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [state, setValue, remove] as const;
}
