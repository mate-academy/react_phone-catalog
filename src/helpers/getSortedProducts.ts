import { Product } from '../types/Product';
import { SortTypes } from '../types/SortTypes';
import { SearchParams } from '../types/SearchParams';

export const getSortedProducts = (
  products: Product[],
  searchParams: URLSearchParams,
) => {
  let sortedProducts: Product[] = [...products];
  const query = searchParams.get(SearchParams.Query)?.trim().toLowerCase();
  const sortType = searchParams.get(SearchParams.Sort);

  if (query) {
    sortedProducts = sortedProducts.filter(item => {
      return item.name.toLowerCase().includes(query.toLowerCase());
    });
  }

  sortedProducts.sort((a: Product, b: Product) => {
    switch (sortType) {
      case SortTypes.NAME:
        return b[sortType].localeCompare(a[sortType]);
      case SortTypes.PRICE:
        return a[sortType] - b[sortType];
      case SortTypes.AGE:
        return b[sortType] - a[sortType];
      default:
        return 0;
    }
  });

  return sortedProducts;
};
