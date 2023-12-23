import { useState } from 'react';
import { ProductCardType } from './types/ProductCardType'; // Import the correct type

export const useLocalStorage = (
  key: string,
  initialValue: ProductCardType[], // Update the type here
): [ProductCardType[], (value: ProductCardType[]
  ) => void] => {
  const [value, setValue] = useState<ProductCardType[]>(() => {
    try {
      const data = localStorage.getItem(key);

      return data ? JSON.parse(data) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (data: ProductCardType[]) => { // Update the type here
    setValue(data);
    localStorage.setItem(key, JSON.stringify(data));
  };

  return [value, save];
};
