import { Product } from '../../types/Product';

export const filterProductsByCategory = (
  products: Product[],
  category: string,
): Product[] => {
  return products.filter(product => product.category === category);
};
