import { Product } from '../types/Product';
import { Sort } from '../types/Sort';

export const sortProducts = (products: Product[], sort: Sort) => {
  return [...products].sort((x, y) => {
    switch (sort) {
      case Sort.AGE:
        return y.price - x.price;
      case Sort.PRICE:
        return x.price - y.price;
      default:
        return x.name.localeCompare(y.name);
    }
  });
};
