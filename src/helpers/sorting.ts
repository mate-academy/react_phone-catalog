import { Product } from '../types/Product';

export enum SortType {
  AGE = 'age',
  TITLE = 'title',
  PRICE = 'price',
}

export function sortProducts(products: Product[], sortType: string): Product[] {
  const sorted = [...products];

  switch (sortType) {
    case SortType.AGE:
      return sorted.sort((a, b) => b.year - a.year);
    case SortType.TITLE:
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case SortType.PRICE:
      return sorted.sort((a, b) => a.price - b.price);
    default:
      return sorted;
  }
}
