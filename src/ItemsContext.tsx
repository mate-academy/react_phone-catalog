import React, { useMemo } from 'react';
import { Product } from './types/Product';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Item } from './types/Item';
import { Price } from './types/Price';

type ItemsContextType = {
  amountOfItems: number;
  favoriteProducts: Product[];
  setFavoriteProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  allPrices: Price[];
  setAllPrices: React.Dispatch<React.SetStateAction<Price[]>>;
};

export const ItemsContext = React.createContext<ItemsContextType>({
  amountOfItems: 0,
  favoriteProducts: [],
  setFavoriteProducts: () => {},
  items: [],
  setItems: () => {},
  allPrices: [],
  setAllPrices: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ItemsProvider: React.FC<Props> = ({ children }) => {
  const [favoriteProducts, setFavoriteProducts] = useLocalStorage<Product[]>(
    'favoriteProducts',
    [],
  );

  const [items, setItems] = useLocalStorage<Item[]>('items', []);

  const [allPrices, setAllPrices] = useLocalStorage<Price[]>('allPrices', []);

  const amountOfItems = items.reduce((prev, item) => {
    return item.quantity + prev;
  }, 0);

  const value = useMemo(
    () => ({
      amountOfItems,
      favoriteProducts,
      setFavoriteProducts,
      items,
      setItems,
      allPrices,
      setAllPrices,
    }),
    [
      amountOfItems,
      favoriteProducts,
      setFavoriteProducts,
      items,
      setItems,
      allPrices,
      setAllPrices,
    ],
  );

  return (
    <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
  );
};
