import { Product } from '../types/product';

export const sliceToShow = (
  sorted: Product[],
  currentPage: number,
  itemsOnPage: number,
) => {
  const firstPageIndex = (currentPage - 1) * itemsOnPage;
  const lastPageIndex = firstPageIndex + itemsOnPage;

  return sorted.slice(firstPageIndex, lastPageIndex);
};

export const last = (sorted: Product[], itemsOnPage: number) => {
  if (sorted.length === undefined) {
    return 0;
  } else {
    return Math.ceil(sorted.length / itemsOnPage);
  }
};
