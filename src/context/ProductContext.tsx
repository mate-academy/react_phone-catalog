/* eslint-disable import/extensions */
import { ProductBrief } from '@/types/ProductBrief';
import React, { createContext, useEffect, useState } from 'react';

interface ProductContextType {
  products: ProductBrief[];
  loading: boolean;
  error: string;
}

export const ProductContext = createContext<ProductContextType | null>(null);

type ProviderProps = {
  children: React.ReactNode;
};

export const ProductProvider: React.FC<ProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<ProductBrief[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('api/products.json');

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();

      setProducts(data);
    } catch (err) {
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    products,
    loading,
    error,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
