import React, { useState } from 'react';
import { Product } from '../types/Product';

type Context = {
  favorites: Product[],
  addRemoveToFavorites: (product: Product) => void,
};

export const FavoritesContext = React.createContext<Context>({
  favorites: [],
  addRemoveToFavorites: () => {},
});

export const FavoritesProvider: React.FC = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  const addRemoveToFavorites = (product: Product) => {
    const inFavorites = favorites.find(item => item.id === product.id);

    if (inFavorites) {
      setFavorites([...favorites.filter(item => item.id !== product.id)]);
    } else {
      setFavorites([...favorites, product]);
    }
  };

  const contextValue: Context = {
    favorites,
    addRemoveToFavorites,
  };

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};
