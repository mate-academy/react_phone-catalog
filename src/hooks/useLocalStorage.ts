import { useState } from 'react';

// Типи, які можна безпечно зберігати у localStorage
type SerializableValue =
  | string
  | number
  | boolean
  | null
  | SerializableObject
  | SerializableArray;

type SerializableObject = { [key: string]: SerializableValue };
type SerializableArray = SerializableValue[];

/**
 * Кастомний хук для збереження стану у localStorage
 * @param key - ключ збереження у localStorage
 * @param defaultValue - значення за замовчуванням, якщо в localStorage немає запису
 */
export function useLocalStorage<T extends SerializableValue>(
  key: string,
  defaultValue: T,
): [T, (newValue: T) => void] {
  const [value, setValue] = useState<T>(() => {
    const savedValue = localStorage.getItem(key);

    if (savedValue === null) return defaultValue;

    try {
      return JSON.parse(savedValue);
    } catch (error) {
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
      console.error(`useLocalStorage: cannot save key "${key}"`, error);
    }
  };

  return [value, save];
}
