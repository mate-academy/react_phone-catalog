import { useState } from 'react';

export function useLocalStorage<T>(
  key: string, defoultItems: T,
): [T, (i: T) => void] {
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

  const saveList = (newItems: T) => {
    localStorage.setItem(key, JSON.stringify(newItems));
    setList(newItems);
  };

  return [list, saveList];
}
