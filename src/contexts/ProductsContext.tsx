import React, {
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Product } from '../types/Product';
import { getProducts } from '../services/products';
import { wait } from '../utils/wait';

type ProductsContextType = {
  products: Product[];
};

export const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = () => {
      wait(200)
        .then(() => getProducts())
        .then(data => {
          setProducts(data);
        })
        .catch(error => {
          throw new Error('Error fetching products:', error);
        });
    };

    fetchProducts();
  }, []);

  const value = useMemo(() => ({ products }), [products]);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
