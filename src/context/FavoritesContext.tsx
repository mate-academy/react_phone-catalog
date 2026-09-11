import { createContext, useEffect, useState } from 'react';

import { type Product } from '../types';

type FavoritesContextType = {
  favourites: Product[];
  setFavourites: (favourites: Product[]) => void;
  addFavourite: (product: Product) => void;
  removeFavourite: (productId: string) => void;
};

type Props = {
  children: React.ReactNode;
};

export const FavoritesContext = createContext<FavoritesContextType | null>(
  null,
);

export const FavoritesProvider = ({ children }: Props) => {
  const [favourites, setFavourites] = useState<Product[]>([]);

  useEffect(() => {
    const savedFavourites = localStorage.getItem('favourites');

    if (savedFavourites) {
      setFavourites(JSON.parse(savedFavourites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const addFavourite = (product: Product) => {
    if (favourites.some(favourite => favourite.id === product.id)) {
      return;
    }

    setFavourites([...favourites, product]);
  };

  const removeFavourite = (productId: string) => {
    setFavourites(favourites.filter(favourite => favourite.id !== productId));
  };

  return (
    <FavoritesContext.Provider
      value={{ favourites, setFavourites, addFavourite, removeFavourite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
