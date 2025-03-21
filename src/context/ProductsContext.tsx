/* eslint-disable @typescript-eslint/no-unused-vars */

import { createContext, useContext, useMemo, useState } from 'react';
import { Product } from '../types/Product';

const ProductsContext = createContext([] as Product[]);
const SetProductsContext = createContext((v: Product[]) => {});

export const useProducts = () => useContext(ProductsContext);
export const useSetProducts = () => useContext(SetProductsContext);

type Props = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const value = useMemo(() => products, [products]);

  return (
    <SetProductsContext.Provider value={setProducts}>
      <ProductsContext.Provider value={value}>
        {children}
      </ProductsContext.Provider>
    </SetProductsContext.Provider>
  );
};
