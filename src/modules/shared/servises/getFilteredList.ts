import { SortByAmount, SortByProp } from '../Enum/Sort';
import { Product } from '../types/Product';

export const getFilteredList = (
  list: Product[],
  query: {
    sort: SortByProp;
    perPageValue: SortByAmount;
    page: string;
    sortByText: string;
  },
) => {
  let sortedList = [...list];

  switch (query.sort) {
    case SortByProp.YEAR:
      sortedList = [...list].sort((a, b) => b.year - a.year);
      break;

    case SortByProp.PRICE:
      sortedList = [...list].sort((a, b) => a.price - b.price);
      break;

    case SortByProp.TITLE:
      sortedList = [...list].sort((a, b) => a.name.localeCompare(b.name));
      break;

    default:
      sortedList = [...list];
  }

  if (query.perPageValue !== SortByAmount.ALL) {
    const startIndex = (+query.page - 1) * +query.perPageValue;
    const endIndex = startIndex + +query.perPageValue;

    sortedList = sortedList.slice(startIndex, endIndex);
  }

  if (query.sortByText) {
    sortedList = sortedList.filter((product: Product) =>
      product.name.toLowerCase().includes(query.sortByText.toLowerCase()),
    );
  }

  return sortedList;
};
