import type { ProductFromServer } from '../types/product';

export const getSuggestedProducts = (
  products: ProductFromServer[],
  currentItemId: string,
  limit = 10,
) => {
  return [...products]
    .filter(product => product.itemId !== currentItemId)
    .sort(() => Math.random() - 0.5)
    .slice(0, limit);
};
