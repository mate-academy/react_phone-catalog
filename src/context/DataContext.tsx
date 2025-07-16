import React, { createContext, useEffect, useState } from 'react';
import { Product } from '../types/Product';

type ContextType = {
  products: Product[];
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
};

export const DataContext = createContext<ContextType>({
  products: [],
  selectedProduct: null,
  setSelectedProduct: () => {},
});

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // products fetching
  useEffect(() => {
    fetch('/api/products.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        return response.json();
      })
      .then(data => {
        setProducts(data);
      })
      .catch(() => {});
  }, []);

  return (
    <DataContext.Provider
      value={{ products, selectedProduct, setSelectedProduct }}
    >
      {children}
    </DataContext.Provider>
  );
};
