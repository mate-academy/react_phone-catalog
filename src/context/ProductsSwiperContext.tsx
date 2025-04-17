import { Product } from '@/types/product';
import React from 'react';

import productsList from '../../public/api/products.json';

type ProductsSwiperContextType = {
  filteredProductsByNewModels: Product[];
  filteredProductsByHotPrice: Product[];
};

export const ProductsSwiperContext =
  React.createContext<ProductsSwiperContextType>({
    filteredProductsByNewModels: [],
    filteredProductsByHotPrice: [],
  });

const NEW_YEAR_MODELS = 2022;
const filteredProductsByNewModels = productsList.filter((product: Product) => {
  return (
    (product.year || 2022) >= NEW_YEAR_MODELS &&
    (product.capacity === '128GB' || product.capacity === '256GB')
  );
});

const filteredProductsByHotPrice = [...productsList]
  .filter((product: Product) => product.price < product.fullPrice)
  .sort((a: Product, b: Product) => {
    const discountA = a.fullPrice - a.price;
    const discountB = b.fullPrice - b.price;

    return discountB - discountA;
  });

type Props = {
  children: React.ReactNode;
};

export const ProductsSwiperProvider: React.FC<Props> = ({ children }) => {
  return (
    <ProductsSwiperContext.Provider
      value={{ filteredProductsByNewModels, filteredProductsByHotPrice }}
    >
      {children}
    </ProductsSwiperContext.Provider>
  );
};
