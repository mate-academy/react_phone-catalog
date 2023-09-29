import React, { useContext, useEffect, useState } from 'react';
import { Phone } from '../types/Phone';

// eslint-disable-next-line max-len
const PRODUCTS_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';

type ContextItems = {
  products: Phone[],
  loading: boolean,
};

export const ProductsContext = React.createContext<ContextItems>({
  products: [],
  loading: false,
});

type Props = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<Props> = ({
  children,
}) => {
  const [products, setProducts] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);

      try {
        const response = await fetch(PRODUCTS_URL);
        const data = await response.json();

        setProducts(data);
      } catch {
        throw new Error('Unable to add products, please try later');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading }}>
      {children}
    </ProductsContext.Provider>
  );
};

export function useProducts() {
  const context = useContext(ProductsContext);

  return context;
}
