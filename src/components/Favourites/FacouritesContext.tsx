import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { ProductDetails } from '../../types/ProductTypes';

interface FavouritesProps {
  favorites: ProductDetails[];
  toggleFavorite: (product: ProductDetails) => void;
}

const FavoritesContext = createContext<FavouritesProps | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<ProductDetails[]>(() => {
    const sortedFavorites = localStorage.getItem('favorites');

    return sortedFavorites ? JSON.parse(sortedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product: ProductDetails) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(fav => fav.id === product.id);

      if (isFavorite) {
        return prevFavorites.filter(fav => fav.id !== product.id);
      }

      return [...prevFavorites, product];
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = React.useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavourites must be used within a FavoritesProvider');
  }

  return context;
};
