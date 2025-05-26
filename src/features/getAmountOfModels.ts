import { Product } from '../types/products';

export const getAmountofModels = (products: Product[], category: string) => {
  return products.filter(item => item.category === category.toLowerCase())
    .length;
};
