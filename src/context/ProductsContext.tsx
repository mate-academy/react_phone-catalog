import React, { createContext, useContext, useEffect, useState } from 'react';
import { Card } from '../types/card';

interface ProductsContextType {
  products: Card[];
  setProducts: React.Dispatch<React.SetStateAction<Card[]>>;
  favorites: Card[];
  setFavorites: React.Dispatch<React.SetStateAction<Card[]>>;
  cart: Card[];
  setCart: React.Dispatch<React.SetStateAction<Card[]>>;
  isLoading: boolean;
  error: string | null;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Card[]>(() => {
    try {
      const stored = localStorage.getItem('favorites');

      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [cart, setCart] = useState<Card[]>(() => {
    try {
      const stored = localStorage.getItem('cart');

      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    const fetchProducts = async () => {
      try {
        setError(null);

        const response = await fetch('api/products.json');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products');
      }
    };

    fetchProducts();

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        favorites,
        setFavorites,
        cart,
        setCart,
        isLoading,
        error,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }

  return context;
};

export default { ProductsProvider, useProducts };
