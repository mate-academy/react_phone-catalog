import { Product } from '../types/products';

export const getNewModels = (products: Product[]) => {
  return [...products].filter(product => product.year >= 2022).slice(0, 20);
};

export const getHotPrices = (products: Product[]) => {
  return [...products]
    .filter(product => product.fullPrice > product.price)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 20);
};
