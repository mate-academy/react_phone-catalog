import { Product } from '../types/Product';
import { SortType } from '../types/SortType';

export function sortProducts(
  products: Product[],
  sortType: string,
) {
  switch (sortType) {
    case SortType.Discount:
      return products.sort((a, b) => {
        const differenceA = a.fullPrice - a.price;
        const differenceB = b.fullPrice - b.fullPrice;

        return differenceB - differenceA;
      });

    case SortType.Newest:
      return products.sort((a, b) => b.year - a.year);

    case SortType.Alphabetically:
      return products.sort((a, b) => a.name.localeCompare(b.name));

    case SortType.Cheapest:
      return products.sort((a, b) => a.price - b.price);

    default:
      return products;
  }
}
