import React, { useEffect, useMemo, useState } from 'react';
import { Product } from '../types/Ptoduct';
import { getProducts } from '../services/products';

export const ProductsContext = React.createContext({
  products: [] as Product[],
  loading: false,
  errorMessage: '',
});

type Props = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoading(true);

    getProducts()
      .then(data => {
        setProducts(data);
      })
      .catch(() => {
        setErrorMessage('Failed to load products');
      })
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(
    () => ({
      products,
      loading,
      errorMessage,
    }),
    [products, loading, errorMessage],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
