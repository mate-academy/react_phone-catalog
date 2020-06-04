import React, { useState } from 'react';

type FavoritesContextType = {
  favorites: Phone[];
  addFavorite: (item: Phone) => void;
  removeFavorite: (item: Phone) => void;
  isFavorite: (item: Phone) => boolean;
};

export const FavoritesContext = React.createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
});

export const FavoritesContextWrapper: React.FC = ({ children }) => {
  const [favorites, setFavorites] = useState<Phone[]>([]);

  const addFavorite = (item: Phone) => {
    setFavorites([...favorites, item]);
  };

  const removeFavorite = (item: Phone) => {
    setFavorites(favorites.filter(p => p.id !== item.id));
  };

  const isFavorite = (item: Phone) => {
    return favorites.some(favorite => favorite.id === item.id);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites, addFavorite, removeFavorite, isFavorite,
    }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
