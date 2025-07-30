import { useEffect, useState } from 'react';
import type { Product } from '../types/products';

export type localProduct = Product & {
  quantity: number;
};

export function useLocalStorage<T extends { id: number }>(
  key: string,
  startValue?: T[],
): [localProduct[], (v: T) => void, (v: T, op: 'add' | 'sub') => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch {
      localStorage.removeItem(key);
      return startValue;
    }
  });

  useEffect(() => {
    if (localStorage.getItem('theme') === null) {
      localStorage.setItem('theme', JSON.stringify('light'));
    }

    if (localStorage.getItem('language') === null) {
      localStorage.setItem('language', JSON.stringify('EN'));
    }
  }, []);

  const save = (newItem: T) => {
    const data = localStorage.getItem(key);
    let parsed: localProduct[] = [];

    if (data !== null) {
      try {
        parsed = JSON.parse(data);
      } catch {
        parsed = [];
      }
    }

    const isAlreadyExists = parsed.some((item) => item.id === newItem.id);

    const updatedArray =
      isAlreadyExists ?
        parsed.filter((item) => item.id !== newItem.id)
      : [...parsed, key === 'cart' ? { ...newItem, quantity: 1 } : newItem];

    localStorage.setItem(key, JSON.stringify(updatedArray));
    setValue(updatedArray);
  };

  const count = (item: T, operation: 'add' | 'sub') => {
    const data = localStorage.getItem('cart');
    if (!data) return;

    let parsed: localProduct[] = [];

    try {
      parsed = JSON.parse(data);
    } catch {
      parsed = [];
    }

    const found = parsed.find((pr) => pr.id === item.id);
    if (!found) return;

    let newQuantity = found.quantity;

    switch (operation) {
      case 'add':
        newQuantity += 1;
        break;
      case 'sub':
        newQuantity = Math.max(1, newQuantity - 1);
        break;
    }

    const updatedArray = parsed.map((it) =>
      it.id === item.id ? { ...it, quantity: newQuantity } : it,
    );

    localStorage.setItem('cart', JSON.stringify(updatedArray));
    setValue(updatedArray);
  };

  return [value, save, count];
}
