import { useState, useEffect } from 'react';
import { Product } from '../types/Product';
import { ProductForCart } from '../types/ProductForCart';

export function useLocalStorage(
  initialValue: Product[] | ProductForCart[], key: string,
) {
  const getValue = () => {
    const storage = localStorage.getItem(key);

    if (storage) {
      return JSON.parse(storage);
    }

    return initialValue;
  };

  const [value, setValue] = useState(getValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
