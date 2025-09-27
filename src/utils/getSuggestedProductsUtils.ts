import { Product } from '../types/Product';

export const getSuggestedProducts = (
  products: Product[],
  count: number = 5,
): Product[] => {
  if (products.length === 0) {
    return [];
  }

  const shuffled = [...products].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, count);
};
