import { createContext, ReactNode, useEffect, useState } from 'react';
import * as serviceClient from '../utils/fetchClient';
import { Product } from '../types/Product';

type ProductsContextType = {
  products: Product[];
  categories: string[];
};

export const ProductsContext = createContext<ProductsContextType>({
  products: [],
  categories: [],
});

type Props = {
  children: ReactNode;
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    serviceClient
      .getData<Product[]>('products.json')
      .then(productsFromServer => {
        setProducts(productsFromServer);
        setCategories(
          Array.from(
            new Set(productsFromServer.map(product => product.category)),
          ),
        );
      });
  }, []);

  return (
    <ProductsContext.Provider value={{ categories, products }}>
      {children}
    </ProductsContext.Provider>
  );
};
