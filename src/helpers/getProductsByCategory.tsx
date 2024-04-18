import { UpgradedProduct } from '../types/UpgradedProducts';

export const getProductsByCategory = (
  products: UpgradedProduct[],
  category: string,
) => {
  return [...products].filter(product => product.category === category);
};
