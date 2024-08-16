import { TabAccessPhone } from '../types/tabAccessPhones';

export const sliceToShow = (
  sorted: TabAccessPhone[],
  currentPage: number,
  itemsOnPage: number,
) => {
  const firstPageIndex = (currentPage - 1) * itemsOnPage;
  const lastPageIndex = firstPageIndex + itemsOnPage;

  return sorted.slice(firstPageIndex, lastPageIndex);
};

export const last = (sorted: TabAccessPhone[], itemsOnPage: number) => {
  if (sorted.length === undefined) {
    return 0;
  } else {
    return Math.ceil(sorted.length / itemsOnPage);
  }
};
