import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return initialValue;
    }

    try {
      return JSON.parse(data) as T;
    } catch (e) {
      localStorage.removeItem(key);

      return initialValue;
    }
  });

  const save = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, save];
}

// import { useState } from 'react';

// export function useLocalStorage<T>(key: string, initialValue: T): [T, (v: T) => void] {
//   const [value, setValue] = useState<T>(() => {
//     const data = localStorage.getItem(key);

//     if (data === null) {
//       return initialValue;
//     }

//     try {
//       return JSON.parse(data);
//     } catch (e) {
//       localStorage.removeItem(key);

//       return initialValue;
//     }
//   });

//   const save = (newValue: T) => {
//     localStorage.setItem(key, JSON.stringify(newValue));
//     setValue(newValue);
//   };

//   return [value, save];
// }

// type ReturnValue<T> = [
//   T,
//   (newValue: T) => void,
// ];

// export function useLocalStorage<T>(
//   key: string,
//   initialValue: T,
// ): ReturnValue<T> {
//   const [value, setValue] = useState<T>(() => {
//     const storedItem = localStorage.getItem(key);

//     if (storedItem) {
//       return JSON.parse(storedItem);
//     }

//     return initialValue;
//   });

//   const saveToStorage = (newValue: T) => {
//     localStorage.setItem(key, JSON.stringify(newValue));
//     setValue(newValue);
//   };

//   return [value, saveToStorage];
// }
