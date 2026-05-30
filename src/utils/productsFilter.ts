import { Category } from '../types/Category';
import { Product } from '../types/Product';
import { SortFilter } from '../types/SortFilter';

function filterByCategory(products: Product[], category: Category) {
  return structuredClone(products).filter(
    product => product.category === category,
  );
}

function filterByProductFilter(products: Product[], filter: SortFilter) {
  switch (filter) {
    case SortFilter.Newest: {
      return structuredClone(products).sort((p1, p2) => p2.year - p1.year);
    }

    case SortFilter.Latest: {
      return structuredClone(products).sort((p1, p2) => p1.year - p2.year);
    }

    case SortFilter.PriceAscending: {
      return structuredClone(products).sort((p1, p2) => p1.price - p2.price);
    }

    case SortFilter.PriceDescending: {
      return structuredClone(products).sort((p1, p2) => p2.price - p1.price);
    }

    default:
      return products;
  }
}

export const productsFilter = {
  byCategory: (products: Product[], category: Category): Product[] =>
    filterByCategory(products, category),
  bySortFilter: (products: Product[], sortFilter: SortFilter): Product[] =>
    filterByProductFilter(products, sortFilter),
};
