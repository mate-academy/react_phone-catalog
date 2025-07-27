import { useState, useEffect, useCallback } from 'react';
import type { Product } from '../types/Product';

export function useLocalStorageProducts(storageKey: string) {
  const getInitialListFromStorage = useCallback((): Product[] => {
    try {
      const item = localStorage.getItem(storageKey);
      return item ? (JSON.parse(item) as Product[]) : [];
    } catch {
      return [];
    }
  }, [storageKey]);

  const [items, setItems] = useState<Product[]>(getInitialListFromStorage);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items, storageKey]);

  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key === storageKey) {
        setItems(getInitialListFromStorage());
      }
    }
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [storageKey, getInitialListFromStorage]);

  const add = useCallback((product: Product) => {
    setItems(prev => {
      const exists = prev.some(existing => existing.id === product.id);
      return exists ? prev : [...prev, product];
    });
  }, []);

  const remove = useCallback((product: Product) => {
    setItems(prev => prev.filter(existing => existing.id !== product.id));
  }, []);

  const contains = useCallback(
    (product: Product) => items.some(existing => existing.id === product.id),
    [items],
  );

  const clear = useCallback(() => setItems([]), []);

  return { items, add, remove, contains, clear };
}
