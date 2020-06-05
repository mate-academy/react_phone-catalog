import React, { useState } from 'react';

type FavoritesContextType = {
  favorites: Item[];
  addFavorite: (item: Item) => void;
  removeFavorite: (item: Item) => void;
  isFavorite: (item: Item) => boolean;
};

export const FavoritesContext = React.createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
});

export const FavoritesContextWrapper: React.FC = ({ children }) => {
  const [favorites, setFavorites] = useState<Item[]>([]);

  const addFavorite = (item: Item) => {
    setFavorites([...favorites, item]);
  };

  const removeFavorite = (item: Item) => {
    setFavorites(favorites.filter(p => p.id !== item.id));
  };

  const isFavorite = (item: Item) => {
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
