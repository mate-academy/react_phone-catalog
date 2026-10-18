const VISIBLE_PAGES = 4;

export const getPageNumbers = (pagesCount: number, currentPage: number) => {
  const firstPage = Math.max(
    1,
    Math.min(currentPage - 1, pagesCount - VISIBLE_PAGES + 1),
  );
  const lastPage = Math.min(pagesCount, firstPage + VISIBLE_PAGES - 1);

  return Array.from(
    { length: lastPage - firstPage + 1 },
    (_, index) => firstPage + index,
  );
};
