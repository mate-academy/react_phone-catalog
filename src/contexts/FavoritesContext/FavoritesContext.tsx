import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../../types/Product';

export type FavoriteItem = Product & {
  favoriteItemId: string;
  showDiscount: boolean;
};

type FavoritesContextType = {
  favorites: FavoriteItem[];
  totalFavorites: number;
  toggleFavorite: (product: Product, showDiscount?: boolean) => void;
  isFavorite: (product: Product) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

const generateFavoriteItemId = (product: Product) => {
  return product.itemId;
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    const stored = localStorage.getItem('favorites');

    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product: Product, showDiscount: boolean = false) => {
    const favoriteItemId = generateFavoriteItemId(product);

    setFavorites(prev => {
      const existing = prev.find(f => f.favoriteItemId === favoriteItemId);

      if (existing) {
        return prev.filter(f => f.favoriteItemId !== favoriteItemId);
      }

      return [
        ...prev,
        {
          ...product,
          favoriteItemId,
          showDiscount,
        },
      ];
    });
  };

  const isFavorite = (product: Product) => {
    const favoriteItemId = generateFavoriteItemId(product);

    return favorites.some(f => f.favoriteItemId === favoriteItemId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        totalFavorites: favorites.length,
        toggleFavorite,
        isFavorite,
      }}
    >
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
