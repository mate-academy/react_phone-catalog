import { PaginationConfig } from '../../types/PaginationConfig';

const generateAllPages = (total: number): number[] => {
  return Array.from({ length: total }, (_, i) => i + 1);
};

const generateStartPages = (
  maxVisible: number,
  total: number,
): (number | string)[] => {
  const pages: (number | string)[] = [];

  for (let i = 1; i <= maxVisible - 2; i++) {
    pages.push(i);
  }

  pages.push('...');
  pages.push(total);

  return pages;
};

const generateEndPages = (
  maxVisible: number,
  total: number,
): (number | string)[] => {
  const pages: (number | string)[] = [1, '...'];

  for (let i = total - (maxVisible - 3); i <= total; i++) {
    pages.push(i);
  }

  return pages;
};

const generateMiddlePages = (
  current: number,
  maxVisible: number,
  total: number,
): (number | string)[] => {
  const pages: (number | string)[] = [1, '...'];

  const startPage = current - Math.floor((maxVisible - 4) / 2);
  const endPage = current + Math.floor((maxVisible - 4) / 2);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  pages.push('...');
  pages.push(total);

  return pages;
};

export const getPaginationPages = ({
  totalPages,
  currentPage,
  maxVisiblePages = 10,
}: PaginationConfig): (number | string)[] => {
  const halfVisible = Math.floor(maxVisiblePages / 2);

  if (totalPages <= maxVisiblePages) {
    return generateAllPages(totalPages);
  }

  if (currentPage <= halfVisible + 1) {
    return generateStartPages(maxVisiblePages, totalPages);
  }

  if (currentPage >= totalPages - halfVisible) {
    return generateEndPages(maxVisiblePages, totalPages);
  }

  return generateMiddlePages(currentPage, maxVisiblePages, totalPages);
};
