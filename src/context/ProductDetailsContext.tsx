import React, { createContext, useMemo } from 'react';
import phones from '../../public/api/phones.json';
import tablets from '../../public/api/tablets.json';
import accessories from '../../public/api/accessories.json';
import { ProductDetails } from '@/types/productDetails';

type ProductDetailsContextType = {
  getProduct: (category: string, itemId: string) => ProductDetails | undefined;
};

export const ProductDetailsContext = createContext<
  ProductDetailsContextType | undefined
>(undefined);

const productData = {
  phones,
  tablets,
  accessories,
};

type Props = {
  children: React.ReactNode;
};

export const ProductDetailsProvider: React.FC<Props> = ({ children }) => {
  const getProduct = (category: string, itemId: string) => {
    const products = productData[category as keyof typeof productData] || [];

    return products.find(p => p.id === itemId);
  };

  const value = useMemo(() => ({ getProduct }), []);

  return (
    <ProductDetailsContext.Provider value={value}>
      {children}
    </ProductDetailsContext.Provider>
  );
};
