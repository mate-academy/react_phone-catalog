import React, { useState, useEffect } from 'react';
import { Phone } from '../types/Phone';
import { getProducts } from '../api/getProducts';

export const ProductContext = React.createContext<{
  products: Phone[],
  setProducts: React.Dispatch<React.SetStateAction<Phone[]>>
} | null>(null);

export const ProductsProvider = (
  { children }: { children: React.ReactNode },
) => {
  const [products, setProducts] = useState<Phone[]>([]);

  useEffect(() => {
    getProducts().then((productsFromAPI) => setProducts(productsFromAPI));
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
