import { Product } from '../../types/Product';

export const getProductsCount = (
  products: Product[],
  category: string,
): number => {
  return products.filter((product) => product.category === category).length;
};
