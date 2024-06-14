import { Product } from '../../../types';
import { SORT_VALUES } from '../variables';

export const sortProducts = (products: Product[], sort: string) =>
  [...products].sort((productA, productB) => {
    switch (sort) {
      case SORT_VALUES.title:
        return productA.name.localeCompare(productB.name);

      case SORT_VALUES.age:
        return productB.year - productA.year;

      case SORT_VALUES.price:
        return productA.price - productB.price;

      default:
        return 0;
    }
  });
