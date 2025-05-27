import { Product } from '../types/Product';
import { SortField } from '../types/SortField';

export const sortProducts = (products: Product[], sortField: SortField) => {
  switch (sortField) {
    case SortField.NAME:
      return [...products].sort((a, b) => a.name.localeCompare(b.name));
    case SortField.PRICE:
      return [...products].sort((a, b) => a.price - b.price);
    case SortField.YEAR:
      return [...products].sort((a, b) => a.year - b.year);
    default:
      return products;
  }
};
