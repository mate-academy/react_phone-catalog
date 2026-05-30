import { Product } from '../types/Product';

export const getPaginatedProducts = (
  products: Product[],
  page: number,
  count: number,
) => {
  const startIndex = (page - 1) * count;
  const endIndex = startIndex + count;
  return products.slice(startIndex, endIndex);
};