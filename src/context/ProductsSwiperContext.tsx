import { Product } from '@/types/product';
import React from 'react';

import productsList from 'data/api/products.json';

type ProductsSwiperContextType = {
  filteredProductsByNewModels: Product[];
  filteredProductsByHotPrice: Product[];
  filteredProductsByRandom: Product[];
};

export const ProductsSwiperContext =
  React.createContext<ProductsSwiperContextType>({
    filteredProductsByNewModels: [],
    filteredProductsByHotPrice: [],
    filteredProductsByRandom: [],
  });
//#region new models filter
const NEW_YEAR_MODELS = 2022;
const filteredProductsByNewModels = productsList.filter((product: Product) => {
  return (
    (product.year || 2022) >= NEW_YEAR_MODELS &&
    (product.capacity === '128GB' || product.capacity === '256GB')
  );
});
//#endregion

//#region hot price filter
const filteredProductsByHotPrice = [...productsList]
  .filter((product: Product) => product.price < product.fullPrice)
  .sort((a: Product, b: Product) => {
    const discountA = a.fullPrice - a.price;
    const discountB = b.fullPrice - b.price;

    return discountB - discountA;
  });
//#endregion

//#region random filter
const filteredProductsRandomly = (productList: Product[], count: number) => {
  const effectiveCount = Math.min(count, productList.length);

  const shuffled = [...productList].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, effectiveCount);
};

const filteredProductsByRandom = filteredProductsRandomly(productsList, 8);
//#endregion

type Props = {
  children: React.ReactNode;
};

export const ProductsSwiperProvider: React.FC<Props> = ({ children }) => {
  return (
    <ProductsSwiperContext.Provider
      value={{
        filteredProductsByNewModels,
        filteredProductsByHotPrice,
        filteredProductsByRandom,
      }}
    >
      {children}
    </ProductsSwiperContext.Provider>
  );
};
