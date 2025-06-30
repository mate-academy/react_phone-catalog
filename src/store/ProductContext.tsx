import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Product, ProductContextType } from '../types/Product';
import { getProduct } from '../api';

export const ProductContext = React.createContext<ProductContextType>({
  products: [],
  loading: false,
  loadProducts: async () => {},
  isDataReady: false,
});

type Props = {
  children: React.ReactNode;
};

export const ProductProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDataReady, setIsDataReady] = useState(false);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setProducts([]);
    setIsDataReady(false);

    try {
      try {
        const data = await getProduct();

        setProducts(data);
        setIsDataReady(true);
      } catch {
        setProducts([]);
        setIsDataReady(false);
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, []);

  useEffect(() => {
    if (!products.length) {
      loadProducts();
    }
  }, [products.length, loadProducts]);

  const value = useMemo(
    () => ({
      products,
      loading,
      loadProducts,
      isDataReady,
    }),
    [products, loading, isDataReady, loadProducts],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
