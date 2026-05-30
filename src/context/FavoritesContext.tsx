import React, { useEffect, useMemo, useState } from 'react';
import { Products } from '../utils/types';

type FavoritesContextType = {
  favorites: Products[];
  setFavorites: React.Dispatch<React.SetStateAction<Products[]>>;
};

export const FavoritesContext = React.createContext<FavoritesContextType>({
  favorites: [],
  setFavorites: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const [favorites, setFavorites] = useState<Products[]>(() => {
    const storedFavorites = localStorage.getItem('favorites');

    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const value = useMemo(() => ({ favorites, setFavorites }), [favorites]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
