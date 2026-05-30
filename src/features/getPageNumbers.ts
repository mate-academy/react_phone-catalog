export const getPageNumbers = (
  totalPages: number,
  numbers: number[],
  currentPage: number,
  pageLimit: number,
): (number | string)[] => {
  const pages: (number | string)[] = [];

  if (totalPages <= 4) {
    return numbers;
  }

  pages.push(1);

  if (currentPage > pageLimit + 2) {
    pages.push('...');
  }

  for (
    let i = Math.max(2, currentPage - pageLimit);
    i <= Math.min(currentPage + pageLimit, totalPages - 1);
    i++
  ) {
    pages.push(i);
  }

  if (currentPage < totalPages - pageLimit - 1) {
    pages.push('...');
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
};
