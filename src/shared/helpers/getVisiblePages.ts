export const getVisiblePages = (
  totalPages: number,
  currentPage: number,
): (number | 'dots')[] => {
  const pages: (number | 'dots')[] = [];

  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    pages.push(1, 2, 3, 'dots', totalPages);
  } else if (currentPage >= totalPages - 2) {
    pages.push(1, 'dots', totalPages - 2, totalPages - 1, totalPages);
  } else {
    pages.push(
      1,
      'dots',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      'dots',
      totalPages,
    );
  }

  return pages;
};
