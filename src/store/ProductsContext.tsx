import React, { useEffect, useMemo, useState } from 'react';
import { getProducts } from '../services/products';
import { Loader } from '../components/Loader';
import { LoadingError } from '../components/Errors/LoadingError';
import { Product } from '../types/Product';

type Context = {
  products: Product[];
  reloadProducts: () => void;
  loading: boolean;
};

const State: Context = {
  products: [],
  reloadProducts: () => {},
  loading: false,
};

export const ProductsContext = React.createContext(State);

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
      setProducts([]);
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
      reloadProducts: loadProducts,
      loading,
    }),
    [products, loading],
  );

  return (
    <ProductsContext.Provider value={value}>
      {loading && !errorMessage && <Loader />}
      {!loading && errorMessage && <LoadingError />}
      {!loading && !errorMessage && children}
    </ProductsContext.Provider>
  );
};
