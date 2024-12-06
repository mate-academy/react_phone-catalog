import React, { useEffect, useState } from 'react';
import { Product } from '../../types/Product';

type FavoriteContextType = {
  favorites: Product[];
  addFavoriteProduct: (product: Product) => void;
  removeFafouriteProduct: (itemId: string) => void;
};

export const FavoritesContext = React.createContext<FavoriteContextType>({
  favorites: [],
  addFavoriteProduct: () => {},
  removeFafouriteProduct: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');

    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavoriteProduct = (product: Product) => {
    setFavorites(prevFavorites => {
      return [...prevFavorites, product];
    });
  };

  const removeFafouriteProduct = (itemId: string) => {
    setFavorites(prevFavorites => {
      return prevFavorites.filter(
        favoriteProduct => favoriteProduct.itemId !== itemId,
      );
    });
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavoriteProduct, removeFafouriteProduct }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
