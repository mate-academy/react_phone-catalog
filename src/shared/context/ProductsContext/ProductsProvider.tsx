import React, { createContext, useContext, useEffect, useState } from 'react';
import { Products } from '../../../types/Products';
import { getProducts } from '../../../api/getProducts';

interface ProductsContextType {
  products: Products[];
  hasError: boolean;
  loading: boolean;
}

export const ProductsContext = createContext<ProductsContextType | null>(null);

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Products[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setHasError(false);

    getProducts()
      .then(data => {
        setProducts(data);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <ProductsContext.Provider value={{ products, hasError, loading }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error('useProducts must be used within ProductsProvider');
  }

  return context;
};
