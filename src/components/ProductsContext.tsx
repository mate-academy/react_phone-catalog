import React, {
  ReactNode, useEffect, useMemo, useState,
} from 'react';
import { getProducts } from '../api/api';
import { Product } from '../types/Product';

type ContextValue = {
  products: Product[],
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  isLoading: boolean,
  setIsLoading: (value: boolean) => void,
};

type Props = {
  children: ReactNode,
};

let productsFromServer: Product[] = [];

getProducts().then(res => {
  productsFromServer = res;
});

export const ProductsContext = React.createContext<ContextValue>({
  products: productsFromServer,
  setProducts: () => { },
  isLoading: false,
  setIsLoading: () => { },
});

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProducts().then(res => {
      setProducts(res);

      const newRes: Product[] = [];

      for (let i = 0; i < res.length; i += 1) {
        newRes.push({ ...res[i], number: 1 });
      }

      setProducts(newRes);

      setIsLoading(false);
    });
  }, [isLoading]);

  const contextValue = useMemo(() => (
    {
      products,
      setProducts,
      isLoading,
      setIsLoading,
    }
  ), [products]);

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};
