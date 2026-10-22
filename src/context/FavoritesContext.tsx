import type React from 'react';
import type { Product } from '../types/Product';
import { STORAGE_FAVORITES_KEY } from '../constants/storage-keys';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { FavoritesContextType } from '../types/FavoritesContextType';

const FavoritesContext = createContext<FavoritesContextType | null>(null);

const getStorageData = (): Product[] => {
  try {
    const data = localStorage.getItem(STORAGE_FAVORITES_KEY);
    const parsedData = JSON.parse(data ?? '[]');

    return Array.isArray(parsedData) ? parsedData : [];
  } catch {
    return [];
  }
};

export const FavoritesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [items, setItems] = useState<Product[]>(getStorageData);

  useEffect(() => {
    localStorage.setItem(STORAGE_FAVORITES_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<FavoritesContextType>(() => {
    return {
      items,
      totalCount: items.length,
      isInFavorites: productId => items.some(item => item.id === productId),
      addToFavorites: product =>
        setItems(current =>
          current.some(item => item.id === product.id)
            ? current
            : [...current, product],
        ),
      removeFromFavorites: id =>
        setItems(current => current.filter(item => item.id !== id)),
    };
  }, [items]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }

  return context;
};
