import { Product } from '../types/Product';

export enum SortBy {
  Discount = 'Discount',
  Expensive = 'Expensive',
  Age = 'Newest',
  Name = 'Alphabetically',
  Cheapest = 'Cheapest',
}

export function sortProducts(
  products: Product[] | null,
  sortBy: string,
) {
  if (!products) {
    return null;
  }

  const copyArr = [...products];

  copyArr.sort((product1, product2): number => {
    const discount1 = product1.fullPrice - product1.price;
    const discount2 = product2.fullPrice - product2.price;

    switch (sortBy) {
      case SortBy.Discount:
        return discount2 - discount1;

      case SortBy.Expensive:
        return product2.fullPrice - product1.fullPrice;

      case SortBy.Age:
        return product2.year - product1.year;

      case SortBy.Name:
        return product1.name.localeCompare(product2.name);

      case SortBy.Cheapest:
        return product1.fullPrice - product2.fullPrice;

      default:
        return 0;
    }
  });

  return copyArr;
}
