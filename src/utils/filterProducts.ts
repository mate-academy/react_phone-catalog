import { SortBy } from '../types/SortBy';
import { Product } from '../types/Product';
import productsInfo from '../../public/api/products.json';

export const filterProducts = (
  sortBy: string,
  productList: Product[],
  itemsPerPage: string,
  currentPage: number,
  query: string,
) => {
  let productListCopy = [...productList];

  if (query) {
    productListCopy = productListCopy.filter(({ name }) =>
      name.toLowerCase().includes(query),
    );
  }

  if (
    sortBy === SortBy.cheapest.toLowerCase() ||
    sortBy === SortBy.expensive.toLowerCase()
  ) {
    let direction = 1;

    if (sortBy === SortBy.expensive.toLowerCase()) {
      direction = -1;
    }

    productListCopy.sort(
      (a, b) => direction * (a.priceRegular - b.priceRegular),
    );
  }

  if (
    sortBy === SortBy.newest.toLowerCase() ||
    sortBy === SortBy.oldest.toLowerCase()
  ) {
    let direction = -1;

    if (sortBy === SortBy.oldest.toLowerCase()) {
      direction = 1;
    }

    productListCopy.sort((a, b) => {
      const productYearA =
        productsInfo.find(product => product.itemId === a.id)?.year || 0;
      const productYearB =
        productsInfo.find(product => product.itemId === b.id)?.year || 0;

      return direction * (productYearA - productYearB);
    });
  }

  if (!+itemsPerPage || !productListCopy.length) {
    return [productListCopy, productListCopy];
  }

  const toDisplay = +itemsPerPage || 0;

  return [
    productListCopy.slice(
      (currentPage - 1) * toDisplay,
      (currentPage - 1) * toDisplay + toDisplay,
    ),
    productListCopy,
  ];
};
