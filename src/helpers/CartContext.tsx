import React, { useCallback, useMemo, useState } from 'react';
import { Product } from '../types/ProductType';

function useLocalStorage<T>(key: string, startValue: T): [T, (v: T) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      return startValue;
    }
  });

  const save = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, save];
}

type ContextType = {
  items: Product[],
  increaseCount: (productId: string) => void,
  decreaseCount: (productId: string) => void,
  addValue: (value: Product) => void,
  removeFromCart: (productId: string) => void
};

export const ItemsContext = React.createContext<ContextType>({
  items: [],
  increaseCount: () => {},
  decreaseCount: () => {},
  addValue: () => {},
  removeFromCart: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ItemsProvider: React.FC<Props> = ({ children }) => {
  const [items, setItems] = useLocalStorage<Product[]>('items', []);

  const addValue = useCallback((value: Product) => {
    if (items.find(item => item.id === value.id)) {
      return;
    }

    const newValue = {
      ...value,
      count: 1,
    };

    setItems([...items, newValue]);
  }, [items, setItems]);

  const increaseCount = useCallback((productId: string) => {
    const updatedItems = items.map(item => {
      const newItem = item;

      if (item.id === productId && newItem.count) {
        newItem.count += 1;
      }

      return newItem;
    });

    setItems(updatedItems);
  }, [items, setItems]);

  const decreaseCount = useCallback((productId: string) => {
    const updatedItems = items.map(item => {
      const newItem = item;

      if (item.id === productId && newItem.count) {
        newItem.count -= 1;
      }

      return newItem;
    });

    setItems(updatedItems);
  }, [items, setItems]);

  const removeFromCart = useCallback((productId: string) => {
    const updatedItems = items.filter((item: Product) => item.id !== productId);

    setItems(updatedItems);
  }, [items, setItems]);

  const value = useMemo(() => ({
    items,
    setItems,
    increaseCount,
    decreaseCount,
    addValue,
    removeFromCart,
  }), [items]);

  return (
    <ItemsContext.Provider value={value}>
      {children}
    </ItemsContext.Provider>
  );
};
