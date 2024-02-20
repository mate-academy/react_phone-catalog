import {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';

import { getProducts } from '../../services/products';
import { Product } from '../../types/Product';

type DefaultContextValue = {
  products: Product[],
  loading: boolean,
  errorMessage: string,
};

export const ProductsContext = createContext<DefaultContextValue>({
  products: [],
  loading: false,
  errorMessage: '',
});

type Props = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  function loadProducts() {
    setLoading(true);
    setErrorMessage('');

    getProducts()
      .then(setProducts)
      .catch((error) => {
        setErrorMessage('Can\'t load a product');
        throw error;
      })
      .finally(() => setLoading(false));
  }

  useEffect(loadProducts, []);

  const value = useMemo(() => ({
    products,
    loading,
    errorMessage,
  }), [products, loading, errorMessage]);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export function useProducts() {
  const { products } = useContext(ProductsContext);

  return products;
}
