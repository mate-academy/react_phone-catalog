import { ProductExtended } from '../types/ProductExtended';

export const getProductsByCategory = (
  products: ProductExtended[],
  category: string,
) => {
  return [...products].filter(product => product.category === category);
};
