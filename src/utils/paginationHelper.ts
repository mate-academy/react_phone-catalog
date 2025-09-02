export const getPaginationLinks = (pageCount: number, currentPage: number) => {
  const pages: number[] = [];

  if (pageCount <= 7) {
    for (let i = 1; i <= pageCount; i++) {
      pages.push(i);
    }

    return pages;
  }

  const showLeftDots = currentPage > 4;
  const showRightDots = currentPage < pageCount - 3;

  const first = 1;
  const last = pageCount;

  if (!showLeftDots && showRightDots) {
    // 1 2 3 4 5 ... N
    pages.push(1, 2, 3, 4, 5, 0, last); // 0 — forward dots
  } else if (showLeftDots && !showRightDots) {
    // 1 ... N-4 N-3 N-2 N-1 N
    pages.push(first, -1, last - 4, last - 3, last - 2, last - 1, last); // -1 — back dots
  } else if (showLeftDots && showRightDots) {
    // 1 ... C-1 C C+1 ... N
    pages.push(
      first,
      -1,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      0,
      last,
    );
  } else {
    // fallback
    for (let i = 1; i <= Math.min(7, pageCount); i++) {
      pages.push(i);
    }
  }

  return pages;
};
