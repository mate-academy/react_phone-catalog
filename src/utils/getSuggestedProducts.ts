import { Product } from '../types/Product';

export const getSuggestedProducts = (
  products: Product[],
  currentProductId: string,
  limit = 8,
): Product[] => {
  return products
    .filter(product => product.id !== currentProductId)
    .sort(() => Math.random() - 0.5)
    .slice(0, limit);
};
