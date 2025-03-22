import { SortOptions } from 'shared/constants/sortOptions';
import { Product } from 'shared/types/Product';

export function getProductsBySort(goods: Product[], sort: string) {
  const sortedGoods = [...goods];

  switch (sort) {
    case SortOptions.NEWEST:
      return sortedGoods.sort((a, b) => b.year - a.year);
    case SortOptions.ALPHABETICALLY:
      return sortedGoods.sort((a, b) => a.name.localeCompare(b.name));
    case SortOptions.CHEAPEST:
      return sortedGoods.sort((a, b) => a.price - b.price);
    default:
      return sortedGoods;
  }
}
