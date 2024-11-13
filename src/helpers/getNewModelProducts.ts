import { Product } from '../types/Ptoduct';

export const getNewModelProducts = (products: Product[]): Product[] => {
  return [...products].sort((a, b) => b.year - a.year);
};
