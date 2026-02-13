/* eslint-disable @typescript-eslint/indent */
import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext<{
  favorites: string[];
  toggleFavorite: (id: string) => void;
}>({
  favorites: [],
  toggleFavorite: () => {},
});

export const FavouritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavourites] = useState<string[]>(() => {
    const storedFavourites = localStorage.getItem('favourites');

    return storedFavourites ? JSON.parse(storedFavourites) : [];
  });

  const toggleFavorite = (id: string) => {
    setFavourites((prev: string[]) => {
      const newFavourites = prev.includes(id)
        ? prev.filter((fav: string) => fav !== id)
        : [...prev, id];

      localStorage.setItem('favourites', JSON.stringify(newFavourites));

      return newFavourites;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
