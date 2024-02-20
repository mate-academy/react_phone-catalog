import { Product } from '../types/Product';
import { SortParams } from '../types/SortParams';

type FilterParams = {
  query?: string;
  sort?: string;
};

export function getFilteredProducts(
  products: Product[],
  {
    query = '', sort = '',
  }: FilterParams,
) {
  let filteredProducts = [...products];

  if (query) {
    filteredProducts = filteredProducts.filter(product => {
      return product.name.toLowerCase().includes(query.toLowerCase());
    });
  }

  if (sort) {
    switch (sort) {
      case SortParams.Alphabetically:
        filteredProducts = filteredProducts.sort(
          (product1, product2) => product1[sort].localeCompare(product2[sort]),
        );
        break;

      case SortParams.Newest:
        filteredProducts = filteredProducts.sort(
          (product1, product2) => product2[sort] - product1[sort],
        );
        break;

      case SortParams.Cheapest:
        filteredProducts = filteredProducts.sort(
          (product1, product2) => product1[sort] - product2[sort],
        );
        break;

      default:
        return filteredProducts;
    }
  }

  return filteredProducts;
}
