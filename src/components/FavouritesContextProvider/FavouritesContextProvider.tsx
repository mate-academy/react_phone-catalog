import React, { createContext, useCallback, useMemo } from 'react';
import { Product } from '../../types/Product';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface FavouritesContextType {
  favourites: Product[];
  setFavourites: (items: Product[]) => void;
  toggleFavourite: (item: Product) => void;
}

export const FavouritesContext = createContext<FavouritesContextType>({
  favourites: [],
  setFavourites: () => {},
  toggleFavourite: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const FavouritesContextProvider: React.FC<Props> = ({ children }) => {
  const [
    favourites,
    setFavourites,
  ] = useLocalStorage<Product[]>('favourites', []);

  const toggleFavourite = useCallback((item: Product) => {
    const newFavourites = favourites.includes(item)
      ? favourites.filter(product => product.id !== item.id)
      : [...favourites, item];

    setFavourites(newFavourites);
  }, [favourites, setFavourites]);

  const value: FavouritesContextType = useMemo(() => ({
    favourites,
    setFavourites,
    toggleFavourite,
  }), [favourites, setFavourites, toggleFavourite]);

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};
