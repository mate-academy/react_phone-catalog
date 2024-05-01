import { Product } from '../types/product';
import { SearchParams } from '../types/searchParams';
import { SortType } from '../types/sortFilters';

export const getSortedProducts = (
  products: Product[],
  searchParams: URLSearchParams,
) => {
  let sortedProducts = [...products];
  const query = searchParams.get(SearchParams.Query)?.trim().toLowerCase();
  const sortFilter = searchParams.get(SearchParams.Sort) || SortType.AGE;

  if (query) {
    sortedProducts = sortedProducts.filter(product => {
      return product.name.toLowerCase().includes(query);
    });
  }

  if (!sortFilter) {
    return sortedProducts;
  }

  sortedProducts.sort((a: Product, b: Product) => {
    switch (sortFilter) {
      case SortType.AGE:
        return b.year - a.year;

      case SortType.NAME:
        return b[sortFilter].localeCompare(a[sortFilter]);

      case SortType.PRICE:
        return a[sortFilter] - b[sortFilter];

      default:
        return 0;
    }
  });

  return sortedProducts;
};
