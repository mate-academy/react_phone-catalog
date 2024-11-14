import { Product } from '../types/Product';
import { SearchParams } from '../types/SearchParams';
import { SortingTypes } from '../types/SortFilter';

export const catalogHelper = {
  sort(order: string | null = null, products: Product[] = []): Product[] {
    const sortedProds = [...products];

    switch (order) {
      case SortingTypes.Alphabetical:
      default:
        sortedProds.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case SortingTypes.Cheapest:
        sortedProds.sort((a, b) => a.price - b.price);
        break;

      case SortingTypes.Newest:
        sortedProds.sort((a, b) => b.year - a.year);
        break;
    }

    return sortedProds ? sortedProds : [];
  },

  perPage(sizeStr: string | null = '', products: Product[] = []) {
    if (!sizeStr || isNaN(parseInt(sizeStr))) {
      return [products];
    }

    const size = parseInt(sizeStr);
    const chunk = Array.from(
      { length: Math.ceil(products.length / size) },
      (_, i) => products.slice(i * size, i * size + size),
    );

    return chunk;
  },

  getCurrenPageParam(searchParams: URLSearchParams) {
    const curPgParam = searchParams.get(SearchParams.page);

    if (!curPgParam || isNaN(parseInt(curPgParam))) {
      return 1;
    }

    return parseInt(curPgParam);
  },
};
