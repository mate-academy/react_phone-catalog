import React, { createContext } from 'react';

import { useLocalStorage } from '../../hooks/useLocalStorage';
import { FavoritesContextType } from '../../types/favorites.types';
import { ProductType } from '../../types/product.types';

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useLocalStorage<ProductType[]>(
    'favorites',
    [],
  );

  const toggleFavorite = (product: ProductType) => {
    setFavorites(current => {
      const isFixed = current.some(item => item.id === product.id);

      if (isFixed) {
        return current.filter(item => item.id !== product.id);
      }

      return [...current, product];
    });
  };

  const isFavorites = (productId: string) => {
    return favorites.some(item => item.id === productId);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorites,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
