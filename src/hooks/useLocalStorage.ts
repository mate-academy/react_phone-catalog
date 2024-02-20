import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialProducts: T,
): [T, (v: T) => void] {
  const [products, setProducts] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return initialProducts;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      localStorage.removeItem(key);

      return initialProducts;
    }
  });

  const save = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setProducts(newValue);
  };

  return [products, save];
}
