import { createContext, ReactNode, useEffect, useState } from 'react';
import { Product } from '../types/Product';

const FAVORITES_KEY = 'favorites';

type FavoritesContextType = {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: number) => boolean;
};

type Props = {
  children: ReactNode;
};

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
});

export const FavoritesProvider = ({ children }: Props) => {
  const [favorites, setFavorites] = useState<Product[]>(() => {
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);

    if (!savedFavorites) {
      return [];
    }

    return JSON.parse(savedFavorites) as Product[];
  });

  const toggleFavorite = (product: Product) => {
    setFavorites(currentProducts => {
      const isAlreadyAdded = currentProducts.some(
        currentProduct => currentProduct.id === product.id,
      );

      if (isAlreadyAdded) {
        return currentProducts.filter(
          currentProduct => currentProduct.id !== product.id,
        );
      }

      return [...currentProducts, product];
    });
  };

  const isFavorite = (productId: number) => {
    return favorites.some(product => product.id === productId);
  };

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
