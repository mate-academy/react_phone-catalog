import { Product } from '../types/product';

export const getSuggestedProducts = (products: Product[]): Product[] => {
  return [...products].sort(() => 0.5 - Math.random());
};
