import { Product } from '../types/product';

export const getHotPriceProducts = (products: Product[]) => {
  return [...products]
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 12);
};

export const getBrandNewProducts = (products: Product[]) => {
  return [...products].sort((a, b) => b.year - a.year).slice(0, 12);
};
