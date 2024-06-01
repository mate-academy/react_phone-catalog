import { Product } from '../types/types';

export const getBrandNewProducts = (products: Product[]) => {
  return products
    .filter(({ year }) => year === 2022)
    .sort((a, b) => b.fullPrice - a.fullPrice);
};
