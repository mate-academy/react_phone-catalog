import React, { useState, useEffect } from 'react';
import { Product } from '../types/Product';

type FavouritesContextType = {
  fav: Product[];
  toggleFavourite: (product: Product) => void;
  isFavourite: (id: string) => boolean;
};

export const FavouritesContext = React.createContext<FavouritesContextType>({
  fav: [],
  toggleFavourite: () => {},
  isFavourite: () => false,
});

type Props = {
  children: React.ReactNode;
};

const STORAGE_KEY = 'favourites';

export const FavouritesProvider: React.FC<Props> = ({ children }) => {
  const [fav, setFav] = useState<Product[]>([]);

  // load
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      setFav(JSON.parse(saved));
    }
  }, []);

  // save
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fav));
  }, [fav]);

  // toggle
  const toggleFavourite = (product: Product) => {
    const id = product.itemId;

    setFav(prev => {
      const exists = prev.some(p => p.itemId === id);

      if (exists) {
        return prev.filter(p => p.itemId !== id);
      }

      return [...prev, product];
    });
  };

  // check
  const isFavourite = (id: string) => {
    return fav.some(p => p.itemId === id);
  };

  const value = {
    fav,
    toggleFavourite,
    isFavourite,
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};
