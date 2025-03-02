import React, { useCallback, useEffect, useState } from 'react';
import { Product } from '../types/types';

type FavouritesContextType = {
  favouriteItems: Product[];
  updateFavouriteItems: (items: Product[]) => void;
  favouritesCount: number;
};

type FavouritesProviderProps = {
  children: React.ReactNode;
};

export const FavouritesContext = React.createContext<FavouritesContextType>({
  favouriteItems: [],
  updateFavouriteItems: () => {},
  favouritesCount: 0,
});

export const FavouritesProvider: React.FC<FavouritesProviderProps> = ({ children }) => {
  const [favouriteItems, setFavouriteItems] = useState<Product[]>(() => {
    try {
      const savedFavourites = localStorage.getItem('favourites');

      return savedFavourites ? JSON.parse(savedFavourites) : [];
    } catch (error) {
      console.error('Error parsing favourites from localStorage:', error);
      localStorage.removeItem('favourites');

      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('favourites', JSON.stringify(favouriteItems));
    } catch (error) {
      console.error('Error saving favourites to localStorage:', error);
    }
  }, [favouriteItems]);

  const updateFavouriteItems = useCallback((items: Product[]) => {
    if (items) {
      setFavouriteItems(items);
    }
  }, []);

  return (
    <FavouritesContext.Provider
      value={{
        favouriteItems,
        updateFavouriteItems,
        favouritesCount: favouriteItems.length,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
