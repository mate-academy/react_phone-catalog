import { ProductType } from '../types/ProductType';

export const getCurrentProducts = (
  products: ProductType[],
  perPage: number | null,
  currentPage: number,
) => {
  if (perPage === null) {
    return products;
  }

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  return products?.slice(startIndex, endIndex);
};
