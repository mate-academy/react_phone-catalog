const range = (start: number, end: number) => {
  const length = end - start + 1;

  return Array.from({ length }, (_, i) => start + i);
};

export const getPaginationLinks = (
  pageCount: number,
  currentPage: number,
  siblingCount: number = 1,
  boundaryCount: number = 1,
): Array<number | string> => {
  const totalBoundary = 1 + boundaryCount * 2;
  const totalSiblings = siblingCount * 2;

  const totalVisibleItems = totalBoundary + totalSiblings + 2;

  if (pageCount <= totalVisibleItems) {
    return range(1, pageCount);
  }

  const startPage = 1;
  const endPage = pageCount;

  const startItems = range(startPage, boundaryCount);
  const endItems = range(endPage - boundaryCount + 1, endPage);

  const startMiddle = currentPage - siblingCount;
  const endMiddle = currentPage + siblingCount;

  const showLeftDots = startMiddle > boundaryCount + 1;
  const showRightDots = endMiddle < endPage - boundaryCount;
  const middleRange = range(startMiddle, endMiddle);

  if (!showLeftDots && showRightDots) {
    const leftRangeEnd = 1 + boundaryCount + siblingCount * 2;
    const leftRange = range(startPage, leftRangeEnd);

    return [...leftRange, '...', ...endItems];
  }

  if (showLeftDots && !showRightDots) {
    const rightRangeStart = endPage - boundaryCount - siblingCount * 2;
    const rightRange = range(rightRangeStart, endPage);

    return [...startItems, '...', ...rightRange];
  }

  if (showLeftDots && showRightDots) {
    return [...startItems, '...', ...middleRange, '...', ...endItems];
  }

  return range(1, pageCount);
};
