import React, { useMemo } from 'react';
import { Product } from './types/Product';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Item } from './types/Item';
import { Price } from './types/Price';

type ItemsContextType = {
  favoriteProducts: Product[];
  setFavoriteProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  allPrices: Price[];
  setAllPrices: React.Dispatch<React.SetStateAction<Price[]>>;
  // darkTheme: boolean;
  // setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ItemsContext = React.createContext<ItemsContextType>({
  favoriteProducts: [],
  setFavoriteProducts: () => {},
  items: [],
  setItems: () => {},
  allPrices: [],
  setAllPrices: () => {},
  // darkTheme: darkTheme,
  // setDarkTheme: () => {},
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

  // const [darkTheme, setDarkTheme] = useLocalStorage('darkTheme', false);

  const value = useMemo(
    () => ({
      favoriteProducts,
      setFavoriteProducts,
      items,
      setItems,
      allPrices,
      setAllPrices,
      // darkTheme,
      // setDarkTheme,
    }),
    [
      favoriteProducts,
      setFavoriteProducts,
      items,
      setItems,
      allPrices,
      setAllPrices,
      // darkTheme,
      // setDarkTheme,
    ],
  );

  return (
    <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
  );
};
