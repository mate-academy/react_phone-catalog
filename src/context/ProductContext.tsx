import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types';
import { getProducts } from '../api';

const FAVORITES_STORAGE_KEY = 'favorites';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  favorites: Product[];
  isFavorite: (productId: number) => boolean;
  toggleFavorite: (product: Product) => void;
}

const ProductContext = createContext<ProductContextType>({
  products: [],
  loading: false,
  error: null,
  favorites: [],
  isFavorite: () => false,
  toggleFavorite: () => {},
});

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Product[]>(() => {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);

    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError('Failed to load products'))
      .finally(() => setLoading(false));
  }, []);

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
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        favorites,
        isFavorite,
        toggleFavorite,
      }}
    >
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
