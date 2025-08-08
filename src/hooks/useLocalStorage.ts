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
): [T, (newValue: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    const savedValue = localStorage.getItem(key);

    if (savedValue === null) {
      return defaultValue;
    }

    try {
      return JSON.parse(savedValue);
    } catch (error) {
      localStorage.removeItem(key);

      return defaultValue;
    }
  });

  const save = (newValue: T | ((prev: T) => T)) => {
    const valueToStore =
      typeof newValue === 'function'
        ? (newValue as (prev: T) => T)(value)
        : newValue;

    setValue(valueToStore);
    localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [value, save] as const;
}
