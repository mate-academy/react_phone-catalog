import { Product } from '../types/Product';

export const getNewModelProducts = (products: Product[]): Product[] => {
  return [...products].sort((a, b) => b.year - a.year);
};
