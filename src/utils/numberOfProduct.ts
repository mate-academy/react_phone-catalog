import { Product } from '../types/Product';

export const getCountByCategory = (products: Product[], category: string) => {
  return products.filter(item => item.category === category).length;
};
