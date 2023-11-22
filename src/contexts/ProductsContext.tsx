import { createContext, useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { getProducts } from '../helpers/api';

type ProductsContextType = {
  products: Product[],
  isLoading: boolean,
};

export const ProductsContext = createContext<ProductsContextType>({
  products: [],
  isLoading: false,
});

type Props = {
  children: React.ReactNode,
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <ProductsContext.Provider value={{ products, isLoading }}>
      {children}
    </ProductsContext.Provider>
  );
};
