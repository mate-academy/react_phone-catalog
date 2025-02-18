import { useState } from 'react';

function useLocalStorage<T>(key: string, defaultValue: T[]) {
  const [products, setProducts] = useState<T[]>(() => {
    const localStore = localStorage.getItem(key);

    return localStore ? JSON.parse(localStore) : defaultValue;
  });

  const saveProducts = function (newProduct: T[]) {
    localStorage.setItem(key, JSON.stringify([...newProduct]));
    setProducts([...newProduct]);
  };

  return [products, saveProducts] as const;
}

export default useLocalStorage;
