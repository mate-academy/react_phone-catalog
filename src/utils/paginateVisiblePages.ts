import { maxPages } from '../constants/pagination';

export const paginateVisiblePages = (
  numberOfPages: number[],
  currentPage: number,
) => {
  let tempNumberOfPages = [...numberOfPages];
  const n = Math.ceil(currentPage / maxPages) - 1;

  const items = tempNumberOfPages.slice(maxPages * n, maxPages + maxPages * n);

  tempNumberOfPages = [...items, numberOfPages.length];

  if (maxPages + maxPages * n > numberOfPages.length - 1) {
    tempNumberOfPages = [...items];
  }

  return tempNumberOfPages;
};
