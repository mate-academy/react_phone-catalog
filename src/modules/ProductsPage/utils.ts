import { Product } from '@shared/types';
import { SortBy } from './constants';

export const sortProducts = (
  products: Product[],
  sortBy: SortBy,
): Product[] => {
  const sorted = [...products];

  switch (sortBy) {
    case 'title':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));

    case 'price':
      return sorted.sort((a, b) => a.price - b.price);

    case 'age':
    default:
      return sorted.sort((a, b) => b.year - a.year);
  }
};

// The design shows four page buttons, so the rest is scrolled through
// by keeping the current page in the middle of the window.
const VISIBLE_PAGES = 4;

export const getVisiblePages = (
  currentPage: number,
  totalPages: number,
): number[] => {
  const lastPossibleFirst = Math.max(totalPages - VISIBLE_PAGES + 1, 1);
  const centeredFirst = currentPage - Math.floor(VISIBLE_PAGES / 2) + 1;
  const firstPage = Math.min(Math.max(centeredFirst, 1), lastPossibleFirst);
  const pagesToShow = Math.min(VISIBLE_PAGES, totalPages);

  return Array.from({ length: pagesToShow }, (_, index) => firstPage + index);
};
