import { Product } from '../types/Product';

export const getCategoryLength = (category: string, array: Product[]) => {
  return array.filter(item => item.category === category).length;
};
