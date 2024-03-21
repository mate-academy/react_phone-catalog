import { Product } from '../types/Product';
import { SortBy } from '../types/SortBy';

type FilterParamsType = {
  productsToFilter: Product[];
  sortBy: string;
  searchQuery: string;
};

export function getFilteredProducts({
  productsToFilter,
  sortBy,
  searchQuery,
}: FilterParamsType): Product[] {
  let filteredProducts = [...productsToFilter];

  if (searchQuery) {
    const searchQueryLowerCase = searchQuery.toLowerCase();

    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchQueryLowerCase),
    );
  }

  if (sortBy) {
    filteredProducts = filteredProducts.sort((a, b) => {
      switch (sortBy) {
        case SortBy.Newest:
          return b.year - a.year;
        case SortBy.Alphabetically:
          return a.name.localeCompare(b.name);
        case SortBy.Cheapest:
          return a.price - b.price;
        default:
          return 0;
      }
    });
  }

  return filteredProducts;
}
