import type { Product } from '../types/product';

export const getNewestProducts = (products: Product[]): Product[] => {
  return [...products].sort((a, b) => b.year - a.year).slice(0, 20);
};
