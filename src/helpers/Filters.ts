import { URLSearchParams } from 'url';
import { Product } from '../types/Product';
import { SORT_BY } from '../types/FilterSort';

export function Filter(
  products: Product[],
  searchParams: URLSearchParams,
) {
  let filteredProducts: Product[] = [...products];
  const query = searchParams.get('query'.trim().toLowerCase());
  const sort = searchParams.get('sort');

  filteredProducts = filteredProducts.sort((a, b) => {
    switch (sort) {
      case SORT_BY.Alphabetically:
        return a.name.localeCompare(b.name);

      case SORT_BY.Newest:
        return b.year - a.year;

      case SORT_BY.Cheapest:
        return a.price - b.price;

      default:
        return 0;
    }
  });

  if (query) {
    filteredProducts = filteredProducts.filter(product => {
      return product.name.trim().toLocaleLowerCase().includes(query);
    });
  }

  return filteredProducts;
}
