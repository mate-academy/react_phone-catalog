import { useState } from 'react';
import { Product } from 'src/types/Product';

type InitValue = string | (() => void);

// function getSavedValue(key: string, initialValue: InitValue) {
//   const savedValue = JSON.parse(localStorage.getItem(key) || '[]');

//   if (savedValue) {
//     return savedValue;
//   }

//   if (initialValue instanceof Function) {
//     return initialValue();
//   }

//   return initialValue;
// }

export function useLocalStorage(key: string, initialValue: InitValue) {
  // const [value, setValue] = useState(() => {
  //   try {
  //     return getSavedValue(key, initialValue);
  //   } catch {
  //     return initialValue;
  //   }
  // });

  // useEffect(() => {
  //   localStorage.setItem(key, JSON.stringify(value));
  // }, [value]);

  // return [value, setValue];

  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);

      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue

      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: Product[]) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore
        = value instanceof Function ? value(storedValue) : value;

      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
    }
  };

  return [storedValue, setValue];
}
