import type { Product } from '../types/product';

export const getHotPricedProducts = (products: Product[]): Product[] => {
  return [...products]
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 20);
};
