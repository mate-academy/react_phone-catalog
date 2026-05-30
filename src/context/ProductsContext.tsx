import React, { createContext, useCallback, useRef } from 'react';
import { ProductsType } from '../types/ProductsType';
import { getProducts } from '../utils/getProducts';
import { Product } from '../types/ProductType';

interface ProductsContextType {
  loadCategory: (v: ProductsType) => Promise<Product[]>;
}

export const ProductsContext = createContext<ProductsContextType>({
  loadCategory: async () => [],
});

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const requests = useRef<Record<string, Promise<Product[]> | null>>({});
  const dataRef = useRef<Partial<Record<ProductsType, Product[]>>>({});

  const loadCategory = useCallback(async (api: ProductsType) => {
    if (dataRef.current[api]) {
      return Promise.resolve(dataRef.current[api]);
    }

    if (requests.current[api]) {
      return requests.current[api];
    }

    const promise = getProducts(api)
      .then(categorie => {
        dataRef.current = { ...dataRef.current, [api]: categorie };

        return categorie;
      })
      .catch(() => {
        throw new Error('Something wrong');
      })
      .finally(() => (requests.current[api] = null));

    requests.current[api] = promise;

    return promise;
  }, []);

  return (
    <ProductsContext.Provider value={{ loadCategory }}>
      {children}
    </ProductsContext.Provider>
  );
};
