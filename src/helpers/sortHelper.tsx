import { Product } from '../types/Product';
import { SortType } from '../types/SortType';

export const sortProducts = (
  products: Product[],
  sortBy: string,
): Product[] => {
  const copyOfProducts = [...products];

  return copyOfProducts.sort((item1, item2) => {
    const discount2 = item2.fullPrice - item2.price;
    const discount1 = item1.fullPrice - item1.price;

    switch (sortBy) {
      case SortType.Cheapest:
        return item1.fullPrice - item2.fullPrice;

      case SortType.Expensive:
        return item2.fullPrice - item1.fullPrice;

      case SortType.Alphabetically:
        return item1.name.localeCompare(item2.name);

      case SortType.Newest:
        return item2.year - item1.year;

      case SortType.MaxDiscount:
        return discount2 - discount1;

      case SortType.Random:
        return Math.random() - 0.5;

      default:
        return 0;
    }
  });
};
