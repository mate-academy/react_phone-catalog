import { Product } from '../types/Product';

export const getSuggestedProducts = (
  products: Product[],
  currentId: string,
  amount = 10,
) => {
  return [...products]
    .filter(product => product.itemId !== currentId)
    .sort(() => Math.random() - 0.5)
    .slice(0, amount);
};
