import { useEffect, useState } from 'react';

type SerializableValue =
  | string
  | number
  | boolean
  | null
  | SerializableObject
  | SerializableArray;
export type SerializableObject = { [key: string]: SerializableValue };
type SerializableArray = SerializableValue[];

export function useLocalStorageList<T extends SerializableValue>(
  key: string,
  initialValue: T[],
) {
  const savedItems = localStorage.getItem(key);

  const [items, setItems] = useState<T[]>(() => {
    if (savedItems === null) {
      return initialValue;
    }

    try {
      return JSON.parse(savedItems);
    } catch (e) {
      localStorage.removeItem(key);

      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(items));
  }, [items, key]);

  const isItemInList = (id: string, getId: (item: T) => string) => {
    return items.some(item => getId(item) === id);
  };

  const addItem = (item: T, getId: (item: T) => string) => {
    setItems(prev => {
      if (prev.some(existingItem => getId(existingItem) === getId(item))) {
        return prev;
      }

      return [...prev, item];
    });
  };

  const removeItem = (id: string, getId: (item: T) => string) => {
    setItems(prev => prev.filter(item => getId(item) !== id));
  };

  return { items, setItems, addItem, removeItem, isItemInList };
}
