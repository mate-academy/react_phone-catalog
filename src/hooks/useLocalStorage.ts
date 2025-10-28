import { useState } from 'react';

type SerializableValue =
  | string
  | number
  | boolean
  | null
  | SerializableObject
  | SerializableArray;

type SerializableObject = { [key: string]: SerializableValue };
type SerializableArray = SerializableValue[];

export function useLocalStorage<T extends SerializableValue>(
  key: string,
  defaultValue: T,
): [T, (newValue: T) => void] {
  const [value, setValue] = useState<T>(() => {
    const savedValue = localStorage.getItem(key);

    if (savedValue === null) {
      return defaultValue;
    }

    try {
      return JSON.parse(savedValue);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(`useLocalStorage: invalid JSON for key "${key}"`);
      localStorage.removeItem(key);

      return defaultValue;
    }
  });

  const save = (newValue: T) => {
    setValue(newValue);
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`useLocalStorage: cannot save key "${key}"`, error);
    }
  };

  return [value, save];
}
