import { Product } from '../types/Product';

export const getCategorySize
= (category: string, products: Product[]): number => {
  return products.filter(product => product.category === category).length;
};
