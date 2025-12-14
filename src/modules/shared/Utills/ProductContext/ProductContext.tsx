import React, { useContext, useEffect, useState } from 'react';
import { ProductFullInfo, ProductInfo } from '../types';

type Props = {
  children: React.ReactNode;
};

type ProductsContextType = {
  products: ProductsState;
  setProducts: React.Dispatch<React.SetStateAction<ProductsState>>;
};

type ProductsState = {
  accessories?: ProductFullInfo[];
  phones?: ProductFullInfo[];
  products?: ProductInfo[];
  tablets?: ProductFullInfo[];
};

export const ProductContext = React.createContext<
ProductsContextType | undefined
>(undefined);

export const ProductContextProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<ProductsState | {}>({});

  useEffect(() => {
    Promise.all([
      fetch('/api/phones.json').then(r => r.json()),
      fetch('/api/tablets.json').then(r => r.json()),
      fetch('/api/accessories.json').then(r => r.json()),
      fetch('/api/products.json').then(r => r.json()),
    ]).then(([phones, tablets, accessories, allProducts]) => {
      setProducts({
        phones: phones,
        tablets: tablets,
        accessories: accessories,
        products: allProducts,
      });
    });
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const ctx = useContext(ProductContext);

  if (!ctx) {
    throw new Error('useProducts must be used inside ProductContextProvider');
  }

  return ctx;
};
