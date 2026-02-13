import { Product, SortBy } from '../types';

export const sortProducts = (
  products: Product[],
  sortBy: SortBy,
): Product[] => {
  switch (sortBy) {
    case 'newest':
      return [...products].sort((a, b) => b.year - a.year);
    case 'alphabetically':
      return [...products].sort((a, b) => a.name.localeCompare(b.name));
    case 'cheapest':
      return [...products].sort((a, b) => a.price - b.price);
    default:
      return products;
  }
};

export const formatPrice = (price: number): string => {
  return `$${price.toLocaleString()}`;
};

export const calculateDiscount = (fullPrice: number, price: number): number => {
  return Math.round(((fullPrice - price) / fullPrice) * 100);
};

export const getPageNumbers = (
  currentPage: number,
  totalPages: number,
): number[] => {
  const pages: number[] = [];
  const showPages = 5;
  let start = Math.max(1, currentPage - Math.floor(showPages / 2));
  const end = Math.min(totalPages, start + showPages - 1);

  if (end - start + 1 < showPages) {
    start = Math.max(1, end - showPages + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
};
