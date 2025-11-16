import React, { createContext, useEffect, useMemo, useState } from 'react';
import { UiProduct } from '../components/ProductsSlider/ProductSlider';

type Props = {
  children: React.ReactNode;
};

type FavoriteContextType = {
  favorites: UiProduct[];
  setFavorites: React.Dispatch<React.SetStateAction<UiProduct[]>>;
};

export const FavoriteContext = createContext<FavoriteContextType>({
  favorites: [],
  setFavorites: () => {},
});

export const FavoriteProvider: React.FC<Props> = ({ children }) => {
  const saved = localStorage.getItem('favorites');
  const listOfFavoritesItems = saved ? JSON.parse(saved) : [];

  const [favorites, setFavorites] = useState<UiProduct[]>(listOfFavoritesItems);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const value = useMemo(
    () => ({
      favorites,
      setFavorites,
    }),
    [favorites, setFavorites],
  );

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};
