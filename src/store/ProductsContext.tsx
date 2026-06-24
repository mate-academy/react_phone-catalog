import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { ProductsContextType } from '../types/ProductsContext';
import { Product } from '../types/Product';
import { getProducts } from '../utils/api/services/products';

const ProductsContext = createContext<ProductsContextType | null>(null);

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadProducts = () => {
    setIsLoading(true);
    setHasError(false);

    setTimeout(() => {
      getProducts()
        .then(setProducts)
        .catch(() => setHasError(true))
        .finally(() => setIsLoading(false));
    }, 500);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{ products, isLoading, hasError, reload: loadProducts }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error(
      'useProductsContext must be used within a ProductsProvider',
    );
  }

  return context;
};
