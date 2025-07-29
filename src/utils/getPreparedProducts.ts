import { Product } from '../types/Product';
import { SortOptions } from '../types/SortOptions';

export function getPreparedProducts(
  products: Product[],
  sort: SortOptions,
): Product[] {
  return products.toSorted((product1, product2) => {
    switch (sort) {
      case SortOptions.Newest:
        return product2.year - product1.year;

      case SortOptions.Cheapest:
        return product1.price - product2.price;

      case SortOptions.Alphabetically:
        return product1.name.localeCompare(product2.name);

      default:
        return 0;
    }
  });
}
