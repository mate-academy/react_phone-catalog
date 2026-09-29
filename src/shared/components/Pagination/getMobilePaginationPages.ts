export const DOTS = '...';

export function getMobilePaginationPages(
  totalPages: number,
  currentPage: number,
): (number | string)[] {
  // [1, 2, 3, 4, 5, 6]
  if (totalPages <= 6) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const shouldShowLeftDots = currentPage > 3;
  const shouldShowRightDots = currentPage < totalPages - 2;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  // [1, 2, 3, 4, '...', 10]
  if (!shouldShowLeftDots && shouldShowRightDots) {
    return [1, 2, 3, 4, DOTS, lastPageIndex];
  }

  // [1, '...', 7, 8, 9, 10]
  if (shouldShowLeftDots && !shouldShowRightDots) {
    return [
      firstPageIndex,
      DOTS,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  // [1, '...', 5, 6, '...', 10]
  if (shouldShowLeftDots && shouldShowRightDots) {
    const secondCenterPage =
      currentPage === totalPages - 2 ? currentPage - 1 : currentPage + 1;

    const centerPages = [currentPage, secondCenterPage].sort((a, b) => a - b);

    return [firstPageIndex, DOTS, ...centerPages, DOTS, lastPageIndex];
  }

  return [];
}
