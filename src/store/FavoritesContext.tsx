import React, { useMemo } from 'react';
import { Phone } from '../types/Phone';
import { useLocalStorage } from '../hooks/useLocalStorage';

type FavoritesContextProps = {
  favoritesProducts: Phone[];
  addToFavorites: (product: Phone) => void;
  deleteFavorites: (id: string) => void;
};

export const FavoritesContext = React.createContext<FavoritesContextProps>({
  favoritesProducts: [],
  addToFavorites: () => {},
  deleteFavorites: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const [favoritesProducts, setFavoritesProducts] = useLocalStorage<Phone[]>(
    'favorites',
    [],
  );

  const addToFavorites = (product: Phone) => setFavoritesProducts([
    ...favoritesProducts,
    product,
  ]);

  const deleteFavorites = (deleteId: string) => {
    const filteredFavorites = favoritesProducts
      .filter(({ id }) => id !== deleteId);

    setFavoritesProducts(filteredFavorites);
  };

  const value = useMemo(() => ({
    favoritesProducts,
    addToFavorites,
    deleteFavorites,
  }), [favoritesProducts]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
