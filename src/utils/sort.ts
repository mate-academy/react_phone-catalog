import { Product } from '../types';

export const sortItemsBy = (items: Product[], sortBy: string) => {
  const sortedItems = [...items];

  switch (sortBy) {
    case 'new':
      return sortedItems.reverse();
    case 'alpha':
      return sortedItems.sort((itemA, itemB) =>
        itemA.name.localeCompare(itemB.name),
      );
    case 'alpha-desc':
      return sortedItems.sort((itemA, itemB) =>
        itemB.name.localeCompare(itemA.name),
      );
    case 'exp':
      return sortedItems.sort(
        (itemA, itemB) => itemB.priceDiscount - itemA.priceDiscount,
      );
    case 'cheap':
      return sortedItems.sort(
        (itemA, itemB) => itemA.priceDiscount - itemB.priceDiscount,
      );
    default:
      return sortedItems;
  }
};
