import { useState } from 'react';
import { Product } from '../types/Product';

function useLocalStorage(key: string, defaultValue: Product[]) {
  const [products, setProducts] = useState(() => {
    const localStore = localStorage.getItem(key);

    return localStore ? JSON.parse(localStore) : defaultValue;
  });

  function saveProducts(newProduct: Product[]) {
    localStorage.setItem(key, JSON.stringify([...newProduct]));
    setProducts([...newProduct]);
  }

  return [products, saveProducts] as const;
}

export default useLocalStorage;
