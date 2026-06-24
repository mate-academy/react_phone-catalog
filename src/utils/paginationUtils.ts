export const getPaginationLinks = (
  pageCount: number,
  currentPage: number,
): number[] => {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  const first = 1;
  const last = pageCount;

  const showLeftDots = currentPage > 4;
  const showRightDots = currentPage < pageCount - 3;

  if (!showLeftDots && showRightDots) {
    return [1, 2, 3, 4, 5, 0, last];
  }

  if (showLeftDots && !showRightDots) {
    return [first, -1, last - 4, last - 3, last - 2, last - 1, last]; // -1 = back dots
  }

  if (showLeftDots && showRightDots) {
    return [first, -1, currentPage - 1, currentPage, currentPage + 1, 0, last];
  }

  return Array.from({ length: 7 }, (_, i) => i + 1);
};
