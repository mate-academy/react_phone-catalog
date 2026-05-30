import { useCallback, useState } from 'react';
import { useNotification } from '../context/NotificationContext';

export function useLocalStorage<T>(
  key: string,
  startValue: T,
): [T, (v: T) => void] {
  const { addNotification } = useNotification();
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);

      return storedValue ? JSON.parse(storedValue) : startValue;
    } catch {
      return startValue;
    }
  });

  const save = useCallback(
    (newValue: T) => {
      try {
        localStorage.setItem(key, JSON.stringify(newValue));
        setValue(newValue);
      } catch {
        addNotification('error', `Failed to save ${key} in localStorage`);
      }
    },
    [key, setValue, addNotification],
  );

  return [value, save];
}
