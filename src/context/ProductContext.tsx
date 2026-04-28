import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types';

const FAVORITES_STORAGE_KEY = 'favorites';

interface ProductContextType {
  favorites: Product[];
  isFavorite: (productId: number) => boolean;
  toggleFavorite: (product: Product) => void;
}

const ProductContext = createContext<ProductContextType>({
  favorites: [],
  isFavorite: () => false,
  toggleFavorite: () => {},
});

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState<Product[]>(() => {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);

    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (productId: number) =>
    favorites.some(item => item.id === productId);

  const toggleFavorite = (product: Product) => {
    setFavorites(prev =>
      prev.some(item => item.id === product.id)
        ? prev.filter(item => item.id !== product.id)
        : [...prev, product],
    );
  };

  return (
    <ProductContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }

  return context;
};
