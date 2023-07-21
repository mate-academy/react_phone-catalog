import { Product } from '../types/Product';
import { SortType } from '../types/SortType';

export const getVisibleProducts = (
  products: Product[],
  sort: string,
  itemsPerPage: string,
  currentPage: number,
) => {
  const visibleItems = [...products];
  const total = products.length;

  visibleItems.sort((a, b) => {
    switch (sort) {
      case SortType.AGE:
        return a.age - b.age;
      case SortType.PRICE:
        return a.price * (1 - 0.01 * a.discount)
          - b.price * (1 - 0.01 * b.discount);
      case SortType.NAME:
        return a.name.localeCompare(b.name);

      default:
        throw new Error('Unable to sort');
    }
  });

  if (itemsPerPage === 'all') {
    return visibleItems;
  }

  const currentPageLastIndex = currentPage * (+itemsPerPage);
  const firstItem = currentPageLastIndex - (+itemsPerPage);
  const lastItem = currentPageLastIndex <= total
    ? currentPageLastIndex
    : total;

  return visibleItems.slice(firstItem, lastItem);
};
