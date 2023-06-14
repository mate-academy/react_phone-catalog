import { useState, useEffect } from 'react';
import { Phone } from '../types/Phone';
import { CartItem } from '../types/CartItem';

export function useLocalStorage(
  initialValue: Phone[] | CartItem[], key: string,
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
