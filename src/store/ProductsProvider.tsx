import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { Product } from '../types/types';

export const ProductsContext = createContext<Product[]>([]);

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/products.json');
      const json = await response.json();

      setProducts(json);
    };

    fetchData();
  }, []);

  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
};
