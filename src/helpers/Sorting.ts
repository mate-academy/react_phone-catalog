import { Product } from '../types/Product';
import { sorting } from './constants';

export const sortedItems = (sortParam: string, phones: Product[]) => {
  if (sortParam === sorting[0].value) {
    return [...phones].sort((a, b) => b.year - a.year);
  }

  if (sortParam === sorting[1].value) {
    return [...phones].sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortParam === sorting[2].value) {
    return [...phones].sort((a, b) => a.price - b.price);
  }

  return phones;
};

export const itemsToShow = (
  total: number,
  currentPage: string,
  perPageParam: string,
  sortParam: string,
  phones: Product[],
) => {
  const lastItem = (+currentPage * +perPageParam) > total
    ? total
    : +currentPage * +perPageParam;
  const firstItem = (+currentPage * +perPageParam) - +perPageParam + 1;

  return (
    perPageParam === 'All'
      ? sortedItems(sortParam, phones)
      : sortedItems(sortParam, phones).slice(firstItem - 1, lastItem)
  );
};

export const pagesCount = (total: number, perPageParam: string) => {
  return (
    (perPageParam && perPageParam !== 'All')
      ? Math.ceil(total / +perPageParam)
      : 1
  );
};
