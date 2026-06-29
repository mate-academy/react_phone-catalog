import React, { useEffect, useMemo, useState } from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';
import { LOCAL_STORAGE_KEYS } from '../constants/localeStorage';
import { Product } from '../types/Product';
import { isItemInFavorite } from '../utils/isItemInFavorite';

type FavoriteContextType = {
  favoriteProducts: Product[];
  totalFavoriteProducts: number;
  toggleFavorite: (product: Product) => void;
};

export const FavoriteContext = React.createContext<FavoriteContextType | null>(
  null,
);

type Props = {
  children: React.ReactNode;
};

export const FavoriteContextProvider: React.FC<Props> = ({ children }) => {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>(() =>
    getFromLocalStorage(LOCAL_STORAGE_KEYS.favorite, []),
  );

  const totalFavoriteProducts = favoriteProducts.length;

  const toggleFavorite = (product: Product) => {
    setFavoriteProducts(prev =>
      isItemInFavorite(prev, product.itemId)
        ? prev.filter(p => p.itemId !== product.itemId)
        : [...prev, product],
    );
  };

  const value = useMemo(
    () => ({
      favoriteProducts,
      totalFavoriteProducts,
      toggleFavorite,
    }),
    [favoriteProducts, totalFavoriteProducts],
  );

  useEffect(() => {
    saveToLocalStorage(LOCAL_STORAGE_KEYS.favorite, favoriteProducts);
  }, [favoriteProducts]);

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};
