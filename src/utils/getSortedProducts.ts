import { Product } from '../types/Product';
import { SortOrders, SortOrdersType } from '../types/SortOrders';
import { Sorts, SortsType } from '../types/Sorts';

export const getSortedProducts = (
  products: Product[],
  sortBy: SortsType,
  order: SortOrdersType = SortOrders.asc,
) => {
  const currentOrder = order === SortOrders.asc ? 1 : -1;

  switch (sortBy) {
    case Sorts.age:
      return [...products].sort((a, b) => b.year - a.year);
    case Sorts.title:
      return [...products].sort((a, b) => a.name.localeCompare(b.name));
    case Sorts.price:
      return [...products].sort((a, b) => (a.price - b.price) * currentOrder);
    case Sorts.year:
      return [...products].sort((a, b) => (a.year - b.year) * currentOrder);
    default:
      return products;
  }
};
