import { Product } from '@/shared/types';
import { SORT_BY, SortBy } from '@/shared/types';

export function getSortBySelected(
  products: Product[],
  sortBy: SortBy,
): Product[] | [] {
  if (!products || products.length === 0) {
    return [];
  }

  const copyProducts = [...products];

  switch (sortBy) {
    case SORT_BY.AGE:
      return copyProducts.sort((a, b) => b.year - a.year);

    case SORT_BY.PRICE:
      return copyProducts.sort((a, b) => a.price - b.price);

    case SORT_BY.TITLE:
      return copyProducts.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return products;
  }
}
