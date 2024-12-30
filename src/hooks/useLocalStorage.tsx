import { useEffect, useState } from 'react';

// export function useLocalStorage<T>(key: string, initialValue: T) {
//   const [value, setValue] = useState<T>(() => {
//     try {
//       const item = localStorage.getItem(key);

//       return item ? JSON.parse(item) : initialValue;
//     } catch (error) {
//       throw new Error(`Error reading localStorage key "${key}": ${error}`);
//     }
//   });

//   useEffect(() => {
//     try {
//       localStorage.setItem(key, JSON.stringify(value));
//     } catch (error) {
//       throw new Error(`Error saving to localStorage key "${key}": ${error}`);
//     }
//   }, [key, value]);

//   return [value, setValue] as const;
// }

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);

      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      console.warn(`Invalid JSON in localStorage key "${key}". Resetting to default.`);

      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving to localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}
