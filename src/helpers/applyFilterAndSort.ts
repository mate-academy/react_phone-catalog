import { SearchParams } from '../types/Categories';
import { Product } from '../types/Product';
import { SORT_BY } from './constants';

export function applyFilterAndSort(
  products: Product[],
  searchParams: URLSearchParams,
) {
  let filteredProducts: Product[] = [...products];
  const query = searchParams.get(SearchParams.Query)?.trim().toLowerCase();
  const sort = searchParams.get(SearchParams.Sort);

  filteredProducts = filteredProducts.sort((productA, productB) => {
    switch (sort) {
      case SORT_BY.Alphabetically:
        return productA.name.localeCompare(productB.name);
      case SORT_BY.Cheapest:
        return productA.price - productB.price;
      case SORT_BY.Newest:
        return (productA.year - productB.year) * -1;
      default:
        return 0;
    }
  });

  if (query) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.name.toLowerCase().includes(query);
    });
  }

  return filteredProducts;
}
