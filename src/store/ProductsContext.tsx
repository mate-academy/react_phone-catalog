import React, { useContext, useEffect, useMemo, useState } from 'react';
import { getProducts } from '../api';
import { Product } from '../types/Product';

export const ProductsContext = React.createContext({
  products: [] as Product[],
  loading: false,
  error: '',
});

interface Props {
  children: React.ReactNode;
}

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);

    getProducts()
      .then(fetchedProducts => setProducts(fetchedProducts))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(
    () => ({
      products,
      loading,
      error,
    }),
    [products, loading, error],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const products = useContext(ProductsContext);

  return products;
};
