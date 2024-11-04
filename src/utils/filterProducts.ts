import { SortBy } from '../types/SortBy';
import { Product } from '../types/Product';

export const filterProducts = (
  sortBy: string,
  productList: Product[],
  itemsPerPage: string,
  currentPage: number,
) => {
  if (
    sortBy === SortBy.cheapest.toLowerCase() ||
    sortBy === SortBy.expensive.toLowerCase()
  ) {
    let direction = 1;

    if (sortBy === SortBy.expensive.toLowerCase()) {
      direction = -1;
    }

    productList.sort((a, b) => direction * (a.priceRegular - b.priceRegular));
  }

  if (
    sortBy === SortBy.newest.toLowerCase() ||
    sortBy === SortBy.oldest.toLowerCase()
  ) {
    let direction = -1;

    if (sortBy === SortBy.oldest.toLowerCase()) {
      direction = 1;
    }

    productList.sort((a, b) => {
      const processorA = a.processor.split(' ');
      const processorB = b.processor.split(' ');

      return direction * (+processorA[1].slice(1) - +processorB[1].slice(1));
    });
  }

  if (!+itemsPerPage) {
    return productList;
  }

  const toDisplay = +itemsPerPage || 0;

  return productList.slice(
    (currentPage - 1) * toDisplay,
    (currentPage - 1) * toDisplay + toDisplay,
  );
};
