export const getVisiblePages = (
  currentPage: string,
  pagesPerPage: number[],
) => {
  const pagesToShow = 4;
  const startIndex = Math.max(+currentPage - Math.floor(pagesToShow / 2), 1);
  const endIndex = Math.min(startIndex + pagesToShow - 1, pagesPerPage.length);

  const visiblePages = [];

  for (let i = startIndex; i <= endIndex; i++) {
    visiblePages.push(i);
  }

  return visiblePages;
};
