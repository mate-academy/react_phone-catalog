import { ProductType } from '../types/product.types';

export const filterProductsByCategory = (
  products: ProductType[],
  category: string,
): ProductType[] => {
  return products.filter(product => product.category === category);
};
