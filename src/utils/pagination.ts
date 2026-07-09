export const getPaginationRange = (currentPage: number, totalPages: number) => {
  const delta = 1;
  const range = [];
  const rangeWithDots = [];

  for (
    let i = Math.max(1, currentPage - delta);
    i <= Math.min(totalPages, currentPage + delta);
    i++
  ) {
    range.push(i);
  }

  if (currentPage - delta > 2) {
    rangeWithDots.push(1, '...');
  } else {
    rangeWithDots.push(1);
  }

  for (const i of range) {
    if (i !== 1 && i !== totalPages) {
      rangeWithDots.push(i);
    }
  }

  if (currentPage + delta < totalPages - 1) {
    rangeWithDots.push('...', totalPages);
  } else if (totalPages > 1) {
    rangeWithDots.push(totalPages);
  }

  return Array.from(new Set(rangeWithDots));
};
