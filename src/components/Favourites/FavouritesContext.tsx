import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { Product } from '../../types/ProductTipes';

interface FavouritesProps {
  favourites: Product[];
  toggleFavourite: (product: Product) => void;
}

const FavouritesContext = createContext<FavouritesProps | undefined>(undefined);

export const FavouritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favourites, setFavourites] = useState<Product[]>(() => {
    const sortedFavourites = localStorage.getItem('favourites');

    return sortedFavourites ? JSON.parse(sortedFavourites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = (product: Product) => {
    setFavourites(prev => {
      const isFavourite = prev.some(f => f.id === product.id);

      if (isFavourite) {
        return prev.filter(f => f.id !== product.id);
      }

      return [...prev, product];
    });
  };

  return (
    <FavouritesContext.Provider value={{ favourites, toggleFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = React.useContext(FavouritesContext);

  if (!context) {
    throw new Error('useFavourites has to be used within a FavouritesProvider');
  }

  return context;
};
