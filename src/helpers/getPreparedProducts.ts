import { Product } from '../types/Product';
import { SortOptions } from '../types/SortOptions';

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
    page: string | null;
  },
) => {
  let preparedProducts = [...products];

  if (query) {
    const normalizedQuery = query.toLocaleLowerCase();

    preparedProducts = preparedProducts.filter(item => {
      return item.name.toLocaleLowerCase().includes(normalizedQuery);
    });
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
    preparedProducts = preparedProducts.slice(
      (+page - 1) * +onPage,
      +page * +onPage,
    );
  }

  return preparedProducts;
};
