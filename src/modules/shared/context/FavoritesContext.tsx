import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { Product } from '../types/Product';

type FavoritesContextValue = {
  favoriteProducts: Product[];
  favoritesQuantity: number;
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);
const FAVORITES_STORAGE_KEY = 'nice-gadgets-favorites';

type Props = {
  children: ReactNode;
};

const readFavorites = () => {
  try {
    const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);

    return savedFavorites ? (JSON.parse(savedFavorites) as Product[]) : [];
  } catch {
    return [];
  }
};

export const FavoritesProvider = ({ children }: Props) => {
  const [favoriteProducts, setFavoriteProducts] =
    useState<Product[]>(readFavorites);

  useEffect(() => {
    localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(favoriteProducts),
    );
  }, [favoriteProducts]);

  const value = useMemo<FavoritesContextValue>(() => {
    const isFavorite = (productId: string) => {
      return favoriteProducts.some(product => product.itemId === productId);
    };

    const toggleFavorite = (product: Product) => {
      setFavoriteProducts(currentProducts => {
        const isAdded = currentProducts.some(
          currentProduct => currentProduct.itemId === product.itemId,
        );

        if (isAdded) {
          return currentProducts.filter(
            currentProduct => currentProduct.itemId !== product.itemId,
          );
        }

        return [...currentProducts, product];
      });
    };

    return {
      favoriteProducts,
      favoritesQuantity: favoriteProducts.length,
      toggleFavorite,
      isFavorite,
    };
  }, [favoriteProducts]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }

  return context;
};
