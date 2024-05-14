import React, { useEffect, useState } from 'react';
import { getNewProducts } from '../api/products';
import { ProductGeneral } from '../types/ProductGeneral';

export const ProductContext = React.createContext<ProductGeneral[]>([]);

type Props = {
  children: React.ReactNode;
};

export const ProductProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<ProductGeneral[]>([]);

  useEffect(() => {
    getNewProducts().then(newProducts => {
      setProducts(newProducts);
    });
  }, []);

  return (
    <ProductContext.Provider value={products}>
      {children}
    </ProductContext.Provider>
  );
};
