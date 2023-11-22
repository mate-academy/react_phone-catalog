import { Product } from '../types/Product';

export const calculateItemRange = (
  currentPage: string,
  itemsPerPage: string,
  items: Product[],
) => {
  const startIndex = (+currentPage - 1) * +itemsPerPage;
  const endIndex = Math.min(startIndex + +itemsPerPage, items.length);

  return items.slice(startIndex, endIndex);
};
