import { Product } from '../types';
import { SORT_BY } from './constants';

export const prepareProducts = (
  products: Product[],
  { sort, query }: { sort: string; query: string },
) => {
  let preparedProducts = [...products];

  if (query) {
    preparedProducts = preparedProducts
      .filter(product => product.name.toLowerCase().includes(query));
  }

  preparedProducts = preparedProducts.sort((productA, productB) => {
    switch (sort) {
      case SORT_BY.Alphabetically:
        return productA.name.localeCompare(productB.name);
      case SORT_BY.Cheapest:
        return productA.price - productB.price;
      case SORT_BY.Newest:
        return (productA.year - productB.year) * -1;
      default:
        return 0;
    }
  });

  return preparedProducts;
};
