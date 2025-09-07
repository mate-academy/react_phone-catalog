// src/components/pages/FavouritesCart/favouritesProvider.jsx
import React, { useEffect, useState } from 'react';
import { FavouritesContext } from './favouritesContext';

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState(() => {
    const stored = localStorage.getItem('favourites');

    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const addToFavourites = product => {
    setFavourites(prev => {
      const exists = prev.find(item => item.id === product.id);

      if (exists) {
        return prev;
      }

      return [...prev, product];
    });
  };

  const removeFromFavourites = id => {
    setFavourites(prev => prev.filter(item => item.id !== id));
  };

  const isFavourite = id => favourites.some(item => item.id === id);

  return (
    <FavouritesContext.Provider
      value={{ favourites, addToFavourites, removeFromFavourites, isFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
