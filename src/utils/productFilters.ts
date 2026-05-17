import { Product } from '@/types/Product';
import { SortType } from '@/types/SortType';

export const sortProducts = (products: Product[], sortBy: SortType) => {
  const sorted = [...products];

  switch (sortBy) {
    case 'priceLow':
      return sorted.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    case 'priceHigh':
      return sorted.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    case 'oldest':
      return sorted.sort((a, b) => (a.year ?? 0) - (b.year ?? 0));
    case 'newest':
    default:
      return sortByNewest(sorted);
  }
};

export const sortByNewest = (products: Product[]) =>
  [...products].sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

export const sortByBestPrice = (products: Product[]) =>
  [...products].sort((a, b) => {
    const discountA = (a.fullPrice ?? a.price ?? 0) - (a.price ?? 0);
    const discountB = (b.fullPrice ?? b.price ?? 0) - (b.price ?? 0);
    return discountB - discountA;
  });
