import { useState } from 'react';
import { Product } from '../types/Product';

export function useLocalStorage(
  key: string, defoultItems: Product[],
): [Product[], (i: Product[]) => void] {
  const [list, setList] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return defoultItems;
    }

    try {
      return JSON.parse(data);
    } catch (error) {
      localStorage.removeItem(key);

      return defoultItems;
    }
  });

  const saveList = (newItems: Product[]) => {
    localStorage.setItem(key, JSON.stringify(newItems));
    setList(newItems);
  };

  return [list, saveList];
}
