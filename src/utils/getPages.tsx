export const getPages = (
  currentPage: number,
  totalPages: number,
  siblings: number = 1,
): (number | string)[] => {
  const pages: (number | string)[] = [];

  const startPage = Math.max(2, currentPage - siblings);
  const endPage = Math.min(totalPages - 1, currentPage + siblings);

  pages.push(1);

  if (startPage > 2) {
    pages.push('...');
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (endPage < totalPages - 1) {
    pages.push('...');
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
};
