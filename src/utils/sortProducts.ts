import { FilterType } from '../types/Filter';
import { Product } from '../types/Product';

export const sortProducts = (products: Product[], sortKey: FilterType) => {
  switch (sortKey) {
    case FilterType.age:
      return [...products].sort((a, b) => b.year - a.year);
    case FilterType.title:
      return [...products].sort((a, b) => a.name.localeCompare(b.name));
    case FilterType.price:
      return [...products].sort((a, b) => a.price - b.price);
    default:
      return products;
  }
};
