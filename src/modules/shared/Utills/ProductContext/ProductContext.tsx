import React, { useContext, useEffect, useState } from 'react';
import { ProductFullInfo, ProductInfo } from '../types';

type Props = {
  children: React.ReactNode;
};

type ProductsContextType = {
  products: ProductsState;
  setProducts: React.Dispatch<React.SetStateAction<ProductsState>>;
  isLoad: boolean;
};

export type ProductsState = {
  accessories?: ProductFullInfo[];
  phones?: ProductFullInfo[];
  products?: ProductInfo[];
  tablets?: ProductFullInfo[];
};
/* eslint-disable @typescript-eslint/indent */
export const ProductContext = React.createContext<
  ProductsContextType | undefined
>(undefined);

export const ProductContextProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<ProductsState | {}>({});
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('api/phones.json').then(r => r.json()),
      fetch('api/tablets.json').then(r => r.json()),
      fetch('api/accessories.json').then(r => r.json()),
      fetch('api/products.json').then(r => r.json()),
    ])
      .then(([phones, tablets, accessories, allProducts]) => {
        setProducts({
          phones: phones,
          tablets: tablets,
          accessories: accessories,
          products: allProducts,
        });

        setIsLoad(false);
      })

      .catch(error => {
        throw new Error('Failed to load products:', error);
      });
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts, isLoad }}>
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
