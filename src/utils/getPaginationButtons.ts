import { getNumbers } from './getNumbers';

export function getPaginationButtons(
  pagesCount: number,
  currentPage: number,
): number[] {
  if (pagesCount <= 7) {
    return getNumbers(1, pagesCount);
  }

  if (currentPage <= 3) {
    return [...getNumbers(1, 4), 0, pagesCount];
  }

  if (currentPage >= pagesCount - 2) {
    return [1, -1, ...getNumbers(pagesCount - 2, pagesCount)];
  }

  return [
    1,
    -1,
    ...getNumbers(currentPage - 1, currentPage + 1),
    0,
    pagesCount,
  ];
}
