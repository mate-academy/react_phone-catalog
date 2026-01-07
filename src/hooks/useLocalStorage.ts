import { useState, useEffect } from 'react';

// Ten hook działa jak useState, ale zapisuje wszystko w pamięci przeglądarki
export function useLocalStorage<T>(key: string, initialValue: T) {
  // 1. Próbujemy odczytać zapisaną wartość przy starcie
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);

      return initialValue;
    }
  });

  // 2. Zapisujemy wartość przy każdej zmianie
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}
