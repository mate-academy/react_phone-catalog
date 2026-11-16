import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { ProductDetailShort } from '../types/ProductDetailShort';

interface FavoritesContextValue {
  favorites: ProductDetailShort[];
  addFavorite: (product: ProductDetailShort) => void;
  removeFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (product: ProductDetailShort) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined,
);

const STORAGE_KEY = 'favorites';

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<ProductDetailShort[]>(() => {
    try {
      const savedFavorites = localStorage.getItem(STORAGE_KEY);

      return savedFavorites
        ? (JSON.parse(savedFavorites) as ProductDetailShort[])
        : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {}
  }, [favorites]);

  const addFavorite = (product: ProductDetailShort) => {
    setFavorites(current =>
      current.some(item => item.itemId === product.itemId)
        ? current
        : [...current, product],
    );
  };

  const removeFavorite = (productId: string) => {
    setFavorites(current =>
      current.filter(product => product.itemId !== productId),
    );
  };

  const isFavorite = (productId: string) =>
    favorites.some(product => product.itemId === productId);

  const toggleFavorite = (product: ProductDetailShort) => {
    if (isFavorite(product.itemId)) {
      removeFavorite(product.itemId);
    } else {
      addFavorite(product);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider.');
  }

  return context;
};
