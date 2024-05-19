import { Product } from '../types/Product';
import { SortOptions } from '../types/SearchParamsOptions';

export const getPreparedProducts = (
  products: Product[],
  {
    sort,
    query,
    onPage,
    page,
  }: {
    sort: string | null;
    query: string | null;
    onPage: string | null;
    page: string;
  },
) => {
  let preparedProducts = [...products];

  if (!sort) {
    preparedProducts = preparedProducts.sort((a, b) => b.year - a.year);
  }

  if (sort) {
    preparedProducts.sort((a, b) => {
      switch (sort) {
        case SortOptions.Newest:
          return b.year - a.year;
        case SortOptions.HighPrice:
          return b.price - a.price;
        case SortOptions.LowPrice:
          return a.price - b.price;
        default:
          return 0;
      }
    });
  }

  if (onPage && page) {
    const itemsPerPage = parseInt(onPage, 10);
    const currentPage = parseInt(page, 10);

    if (!isNaN(itemsPerPage) && !isNaN(currentPage)) {
      preparedProducts = preparedProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
      );
    }
  }

  if (query) {
    const normalizedQuery = query.toLocaleLowerCase();

    preparedProducts = preparedProducts.filter(item => {
      return item.name.toLocaleLowerCase().includes(normalizedQuery);
    });
  }

  if (!onPage) {
    preparedProducts = preparedProducts.slice(0, 8);
  }

  return preparedProducts;
};
