import { SortByAmount, SortByProp } from '../Enum/Sort';
import { Product } from '../types/Product';

export const getFilteredList = (
  list: Product[],
  query: {
    sort: SortByProp;
    perPage: SortByAmount;
    page: string;
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

  if (query.perPage !== SortByAmount.ALL) {
    const startIndex = (+query.page - 1) * +query.perPage;
    const endIndex = startIndex + +query.perPage;

    sortedList = sortedList.slice(startIndex, endIndex);
  } else {
    return sortedList;
  }

  return sortedList;
};
