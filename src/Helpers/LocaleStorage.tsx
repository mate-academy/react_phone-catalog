import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { useEventCallback, useEventListener } from 'usehooks-ts';

declare global {
  interface WindowEventMap {
    'local-storage': CustomEvent
  }
}

type SetValue<T> = Dispatch<SetStateAction<T>>;

function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '');
  } catch {
    throw Error(`parsing error on ${value}`);

    return undefined;
  }
}

export function useLocaleStorage<T>(
  key: string, initialValue: T,
): [T, SetValue<T>] {
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);

      return item ? (parseJSON(item) as T) : initialValue;
    } catch (error) {
      throw Error(`Error reading localStorage key “${key}”: ${error}`);

      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue: SetValue<T> = useEventCallback((value) => {
    if (typeof window === 'undefined') {
      throw Error(
        `Tried setting localStorage key “${key}” even though environment is not a client`,
      );
    }

    try {
      const newValue = value instanceof Function ? value(storedValue) : value;

      window.localStorage.setItem(key, JSON.stringify(newValue));
      setStoredValue(newValue);

      window.dispatchEvent(new Event('local-storage'));
    } catch (error) {
      throw Error(`Error setting localStorage key “${key}”: ${error}`);
    }
  });

  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStorageChange = useCallback(
    (event: StorageEvent | CustomEvent) => {
      if ((event as StorageEvent)?.key && (event as StorageEvent).key !== key) {
        return;
      }

      setStoredValue(readValue());
    },
    [key, readValue],
  );

  useEventListener('storage', handleStorageChange);
  useEventListener('local-storage', handleStorageChange);

  return [storedValue, setValue];
}

//   const [items, setItem] = useState(() => {
//     if (localStorage.getItem(key)) {
//       return (JSON.parse(localStorage.getItem(key) || '[]'));
//     }

//     return initialValue;
//   });

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(items));
//   }, [items, key]);

//   const save = (value: ItemType) => {
//   //  setItem([...items, value]);
//    setItem(value);

//    console.log(123)
//     localStorage.setItem(key, JSON.stringify(items))
//   };

//   return [items, save];
// };
