import { createContext, useContext, useEffect, useState } from 'react';

import { getProducts } from '../helpers/products';
import { Product } from '../../types/Product';

type ProductsContextType = {
  products: Product[];
  loading: boolean;
  error: boolean;
};

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

type Props = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
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
    throw new Error('useProducts must be used within ProductsProvider');
  }

  return context;
};
