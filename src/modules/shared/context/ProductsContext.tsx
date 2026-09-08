import { createContext, useContext, useEffect, useState } from 'react';
import { getProduct } from '../utils/fetchClient';
import { Product } from '../types/Product';

type ProductsContextType = {
  products: Product[];
  loading: boolean;
  error: boolean;
};

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);

    getProduct('/products.json')
      .then(data => {
        setProducts(data);
        setError(false);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const productsContext = useContext(ProductsContext);

  if (!productsContext) {
    throw new Error('useProducts must be used within ProductsProvider');
  }

  return productsContext;
};
