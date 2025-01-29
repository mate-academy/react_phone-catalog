import { Products } from '../types/Products';

export const getPaginatedProducts = (
  products: Products[],
  page: number,
  count: number,
) => {
  const startIndex = (page - 1) * count;
  const endIndex = startIndex + count;
  return products.slice(startIndex, endIndex);
};
