import React, { useEffect, useMemo, useState } from 'react';
import { Product } from '../types/Product';
import { getProducts } from '../services/products';

export const ProductsContext = React.createContext({
  products: [] as Product[],
  loading: false,
  errorMessage: '',
  reloadProducts: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loadProducts = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const data = await getProducts();

      setProducts(data);
    } catch {
      setErrorMessage('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const value = useMemo(
    () => ({
      products,
      loading,
      errorMessage,
      reloadProducts: loadProducts,
    }),
    [products, loading, errorMessage],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
