import { createContext, ReactNode, useEffect, useState } from 'react';
import * as serviceClient from '../modules/utils/fetchClient';
import { Product } from '../types/Product';

export const CategoriesContext = createContext<string[]>([]);

type Props = {
  children: ReactNode;
};

export const CategoriesProvider: React.FC<Props> = ({ children }) => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    serviceClient
      .getData<Product[]>('products.json')
      .then(products =>
        setCategories(
          Array.from(new Set(products.map(product => product.category))),
        ),
      );
  }, []);

  return (
    <CategoriesContext.Provider value={categories}>
      {children}
    </CategoriesContext.Provider>
  );
};
