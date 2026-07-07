import { Product } from '@/features/products/types/product';

export const getHighPrices = (
  products: Product[],
  limit: number = 10,
): Product[] => {
  return [...products]
    .filter(product => product.fullPrice > product.price)
    .sort((a, b) => b.price - a.price)
    .slice(0, limit);
};
