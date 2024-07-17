import { Product } from '../types/Product';
import { SortBy } from '../types/SortBy';

export const getFilteredProducts = (
  products: Product[],
  query: string,
  sortBy: string,
) => {
  let filteredProducts = [...products];

  if (query) {
    const cleanQuery = query.toLowerCase().trim();

    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(cleanQuery),
    );
  }

  if (sortBy) {
    switch (sortBy) {
      case SortBy.NEWEST:
        filteredProducts = filteredProducts.sort((a, b) => b.year - a.year);
        break;

      case SortBy.ALPHABETICALLY:
        filteredProducts = filteredProducts.sort((a, b) =>
          a.name.localeCompare(b.name),
        );
        break;

      case SortBy.CHEAPEST:
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
        break;

      case SortBy.HOT_PRICE:
        filteredProducts = filteredProducts.sort(
          (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
        );
        break;

      default:
        break;
    }
  }

  return filteredProducts;
};
