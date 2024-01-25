import { VISIBLE_PAGES_COUNT } from '../enums';

type GetVisiblePagesType = (
  pages: number[],
  currentPage: number,
) => number[];

export const getVisiblePages: GetVisiblePagesType = (pages, currentPage) => {
  const firstPage = 1;
  const lastPage = pages.length;

  if (pages.length <= VISIBLE_PAGES_COUNT + 1) {
    return pages;
  }

  if (currentPage - VISIBLE_PAGES_COUNT < firstPage - 1) {
    return [
      ...pages.slice(0, VISIBLE_PAGES_COUNT),
      lastPage,
    ];
  }

  if (currentPage + VISIBLE_PAGES_COUNT > lastPage + 1) {
    return [
      firstPage,
      ...pages.slice(-VISIBLE_PAGES_COUNT),
    ];
  }

  const index = pages.indexOf(currentPage);
  const pageIndent = Math.floor(VISIBLE_PAGES_COUNT / 2);

  return [
    firstPage,
    ...pages.slice(index - pageIndent, index + pageIndent + 1),
    lastPage,
  ];
};
