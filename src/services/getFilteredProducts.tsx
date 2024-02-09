import { Product } from '../types/Product';
import { SortBy } from '../types/SortBy';

export const getFilteredProducts = (
  items: Product[],
  query: string | null,
  sortType: string,
) => {
  let updatedItems = [...items];

  if (sortType) {
    updatedItems = updatedItems.sort((a, b) => {
      switch (sortType) {
        case SortBy.Name:
          return a[sortType].localeCompare(b[sortType]);

        case SortBy.Age:
          return b[sortType] - a[sortType];

        case SortBy.Price:
          return a[sortType] - b[sortType];

        default:
          return 0;
      }
    });
  }

  if (query) {
    const normalizedQuery = query.toLowerCase().trim();

    updatedItems = updatedItems.filter(item => {
      return item.name.toLowerCase().includes(normalizedQuery);
    });
  }

  return updatedItems;
};
