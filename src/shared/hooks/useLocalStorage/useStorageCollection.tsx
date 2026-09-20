import { useLocalStorage } from './useLocalStorage';

export function useStorageCollection<T extends { id: number }>(
  storageKey: string,
) {
  const [items, setItems] = useLocalStorage<T[]>(storageKey, []);

  const add = (item: T) => {
    setItems(prev => {
      if (prev.some(i => i.id === item.id)) {
        return prev;
      }

      return [...prev, item];
    });
  };

  const remove = (id: T['id']) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const exists = (id: T['id']) => {
    return items.some(item => item.id === id);
  };

  return {
    items,
    setItems,
    add,
    remove,
    exists,
  };
}
