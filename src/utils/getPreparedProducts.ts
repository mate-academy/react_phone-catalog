import { Product } from '../types/Product';
import { SortOptions } from '../types/SortOptions';

export function getPreparedProducts(
  products: Product[],
  sort: SortOptions,
  query: string,
): Product[] {
  let preparedProducts = products;

  if (query) {
    preparedProducts = products.filter(product =>
      product.name.toLowerCase().includes(query.trim().toLowerCase()),
    );
  }

  return preparedProducts.toSorted((product1, product2) => {
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
