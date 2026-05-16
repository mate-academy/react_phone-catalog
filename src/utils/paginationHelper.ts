export function getPages(from: number, to: number): number[] {
  const numbers: number[] = [];

  for (let i = from; i <= to; i++) {
    numbers.push(i);
  }

  return numbers;
}

export function getPaginationLinks(
  pagesCount: number,
  currentPage: number,
): number[] {
  if (pagesCount <= 7) {
    return getPages(1, pagesCount);
  }

  if (currentPage <= 3) {
    return [...getPages(1, 4), 0, pagesCount];
  }

  if (currentPage >= pagesCount - 2) {
    return [1, -1, ...getPages(pagesCount - 2, pagesCount)];
  }

  return [1, -1, ...getPages(currentPage - 1, currentPage + 1), 0, pagesCount];
}
