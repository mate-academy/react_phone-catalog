import { Product } from '../types/Product';
import { Sort } from '../types/Sort';

type FilterParams = {
  sort?: string,
  query: string,
};

export const getPreparedProducts = (products: Product[],
  {
    sort,
    query,
  }: FilterParams) => {
  let visibleProducts = [...products];

  if (query) {
    visibleProducts = visibleProducts.filter(
      product => product.name.toLowerCase().includes(
        query.trim().toLowerCase(),
      ),
    );
  }

  if (sort) {
    visibleProducts.sort((product1, product2) => {
      switch (sort) {
        case Sort.Alphabetically:
          return product1.name.localeCompare(product2.name);

        case Sort.Cheapest:
          return product1.fullPrice - product2.fullPrice;

        case Sort.Newest:
          return product2.year - product1.year;

        default:
          return 0;
      }
    });
  }

  if (!sort) {
    visibleProducts.sort((product1, product2) => {
      return product2.year - product1.year;
    });
  }

  return visibleProducts;
};
