import React, { useState, useEffect } from 'react';

export const FavoritesContext = React.createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
});

export const FavoritesContextWrapper: React.FC = ({ children }) => {
  const [favorites, setFavorites] = useState<Array<string>>([]);

  useEffect(
    () => {
      if (localStorage.getItem('favoriteProducts')) {
        setFavorites([...JSON.parse(localStorage.getItem('favoriteProducts') || '')]);
      }
    },
    [],
  );

  useEffect(
    () => localStorage.setItem('favoriteProducts', JSON.stringify([...favorites])),
    [favorites],
  );

  const addFavorite = (product: Good) => {
    setFavorites([...favorites, product.id]);
  };

  const removeFavorite = (product: Good) => {
    setFavorites(favorites.filter(id => id !== product.id));
  };

  const isFavorite = (product: Good) => {
    return favorites.some(id => id === product.id);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};
