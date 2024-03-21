import { Product } from '../types/Product';
import { SortValue } from '../types/SortValue';

export const prepareProductList = (
  products: Product[],
  query: string,
  sort?: string,
) => {
  let preparedPhones = [...products];

  preparedPhones = preparedPhones.sort((a, b) => {
    switch (sort) {
      case SortValue.age:
        return b.price - a.price;

      case SortValue.price:
        return a.price - b.price;

      case SortValue.name:
        return a.name.localeCompare(b.name);

      default:
        return 0;
    }
  });

  if (query) {
    preparedPhones = preparedPhones.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return preparedPhones;
};
