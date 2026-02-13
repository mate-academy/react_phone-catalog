import { ProductsType } from '../types/Products';

type SortBy = 'Newest' | 'Alphabetically' | 'Cheapest' | 'Hotest';

const sortList = (
  currentList: ProductsType[],
  sortFunction: (a: ProductsType, b: ProductsType) => number,
) => {
  return [...currentList].sort((itemA, itemB) => sortFunction(itemA, itemB));
};

export const sortFunction = (sortBy: SortBy, currentList: ProductsType[]) => {
  switch (sortBy) {
    case 'Newest':
      return sortList(
        currentList,
        (a: ProductsType, b: ProductsType) => a.year - b.year,
      );

    case 'Alphabetically':
      return sortList(currentList, (a: ProductsType, b: ProductsType) =>
        a.name
          .toLowerCase()
          .localeCompare(b.name.toLowerCase(), 'en', { numeric: true }),
      );

    case 'Cheapest':
      return sortList(
        currentList,
        (a: ProductsType, b: ProductsType) => a.price - b.price,
      );

    case 'Hotest':
      return sortList(
        currentList,
        (a: ProductsType, b: ProductsType) =>
          b.fullPrice - b.price - (a.fullPrice - a.price),
      );

    default:
      return currentList;
  }
};
