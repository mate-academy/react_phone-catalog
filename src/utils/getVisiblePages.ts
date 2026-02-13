import { getPageNumbers } from './getPageNumbers';

export const getVisiblePages = (
  currentPage: number,
  totalPages: number,
  maxVisible: number,
): number[] => {
  const half = Math.floor(maxVisible / 2);

  // Start page index so current page is roughly centered
  let start = Math.max(1, currentPage - half);
  let end = start + maxVisible - 1;

  // Adjust if range exceeds total pages
  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - maxVisible + 1);
  }

  // Return range from start to end
  return getPageNumbers(start, end);
};
