import { UpgradedProduct } from '../types/UpgradedProduct';

export const getProductsByCategory = (
  products: UpgradedProduct[],
  category: string,
) => {
  return [...products].filter(product => product.category === category);
};
