import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getProducts } from '../shared/utils/productApi';
import { ProductType } from '../shared/types/ProductType';

export interface initialProductContext {
  products: ProductType[];
  howManyItem: (cattegory: string) => number;

  reload: () => void;

  loading: boolean;
  error: boolean;
}

export const ContextProduct = React.createContext<initialProductContext | null>(
  null,
);

interface Props {
  children: React.ReactNode;
}

export const ProviderProduct: React.FC<Props> = ({ children }) => {
  const [product, setProduct] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false);

  useEffect(() => {
    async function initialProducts() {
      setLoading(true);
      setError(false);

      try {
        const products = await getProducts();
        setProduct(products);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    initialProducts();
  }, [reloadFlag]);

  const howManyItem = (cattegory: string) => {
    return product.filter(item => item.category === cattegory).length;
  };

  const reload = useCallback(() => setReloadFlag(prev => !prev), []);

  const value: initialProductContext = useMemo(
    () => ({
      products: product,
      howManyItem,

      loading: loading,
      error: error,
      reload,
    }),
    [product, loading, error],
  );

  return (
    <ContextProduct.Provider value={value}>{children}</ContextProduct.Provider>
  );
};
