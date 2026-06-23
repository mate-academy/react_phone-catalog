import { Product } from '../types/Product';

export const getProductsByCategory = (
  products: Product[],
  category: string,
) => {
  return products.filter(product => product.category === category);
};
