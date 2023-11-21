import { Product } from '../type/Product';

type FilterParams = {
  sortBy: string;
  query: string;
};

export function getFilteredPhones(
  products: Product[],
  sort: FilterParams,
) {
  const {
    sortBy,
    query,
  } = sort;

  let updatedState = [...products];

  switch (sortBy) {
    case 'name':
      updatedState.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case 'price':
      updatedState.sort((a, b) => a.fullPrice - b.fullPrice);
      break;

    default:
      updatedState.sort((a, b) => b.year - a.year);
  }

  if (query) {
    updatedState = updatedState
      .filter(item => item.name
        .toLocaleLowerCase()
        .includes(query));
  }

  return updatedState;
}
