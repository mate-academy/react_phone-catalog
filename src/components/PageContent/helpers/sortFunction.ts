import { Product } from '../../../types/Product';
import { SortType } from '../../../types/SortType';

export const sortFunction = (
  products: Product[],
  sortParams: string = SortType.id,
): Product[] => {
  if (!(sortParams in SortType)) {
    return products;
  }

  const sortedList = [...products];

  sortedList.sort((a, b) => {
    switch (sortParams) {
      case SortType.id:
        return +b.id - +a.id;
      case SortType.age:
        return b.year - a.year;
      case SortType.price:
        return a.price - b.price;
      case SortType.discount:
        return b.fullPrice - b.price - (a.fullPrice - a.price);
      case SortType.name:
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      default:
        return 0;
    }
  });

  return sortedList;
};
