// catalogUtils.ts

import type { ProductCardData } from '../types';

export type SortType = 'alphabet' | 'price' | 'age';

export const sortProducts = (
  products: ProductCardData[],
  sortBy: SortType,
): ProductCardData[] => {
  const sorted = [...products];

  switch (sortBy) {
    case 'alphabet':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));

    case 'price':
      return sorted.sort((a, b) => a.price - b.price);

    case 'age':
      return sorted.sort((a, b) => (b.year || 0) - (a.year || 0));

    default:
      return sorted;
  }
};

export const paginateProducts = <T>(
  items: T[],
  currentPage: number,
  itemsPerPage: number,
): T[] => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return items.slice(startIndex, endIndex);
};

export const generatePaginationPages = (
  totalPages: number,
  currentPage: number,
  maxVisiblePages: number,
): (number | string)[] => {
  const pages: (number | string)[] = [];

  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  pages.push(1);

  if (currentPage > 3) {
    pages.push('...');
  }

  const startPage = Math.max(2, currentPage - 1);
  const endPage = Math.min(totalPages - 1, currentPage + 1);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 2) {
    pages.push('...');
  }

  pages.push(totalPages);

  return pages;
};
