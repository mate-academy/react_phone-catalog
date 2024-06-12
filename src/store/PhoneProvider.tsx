import React, { createContext, useEffect, useState } from 'react';
import { getGadgets } from '../utils/fetchMethods';
import { Products } from '../types/ContextType/Products';

type ContextType = {
  products: Products[];
  setProducts: (v: Products[]) => void;
};

export const PhoneContext = createContext<ContextType>({
  products: [],
  setProducts: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const PhoneProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    getGadgets('/products.json').then(response => setProducts(response));
  }, []);

  const gadgetsTools = {
    products,
    setProducts,
  };

  return (
    <PhoneContext.Provider value={gadgetsTools}>
      {children}
    </PhoneContext.Provider>
  );
};
