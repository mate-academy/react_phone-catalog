export const generatePagination = (currentPage: number, pageCount: number) => {
  if (pageCount <= 5) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [];

  pages.push(1);

  if (currentPage > 3) {
    pages.push('...');
  }

  const startPage = Math.max(2, currentPage - 1);
  const endPage = Math.min(pageCount - 1, currentPage + 1);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (currentPage < pageCount - 2) {
    pages.push('...');
  }

  pages.push(pageCount);

  return pages;
};
