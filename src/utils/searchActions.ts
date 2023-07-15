import { Product } from './types/Product';

interface SearchParams {
  [key: string]: string,
  sort: string,
  query: string,
  page: string,
  perPage: string,
}

const SortList = (list: Product[], sortBy: string | null) => {
  switch (sortBy) {
    case 'alphabetically':
      return list.sort((a, b) => a.name.localeCompare(b.name));
    case 'cheapest':
      return list.sort((a, b) => a.price - b.price);
    default:
      return list.sort((a, b) => b.year - a.year);
  }
};

const filterByQuery = (list: Product[], query: string) => {
  return list.filter(product => product.name
    .toLocaleLowerCase()
    .replaceAll(' ', '').includes(query.toLocaleLowerCase()
      .replaceAll(' ', '')));
};

const sliceProductList = (list: Product[], page: string, perPage: string) => {
  if (perPage === 'all') {
    return list;
  }

  const from = (+page * +perPage) - +perPage;
  const to = from + +perPage;

  return list.slice(from, to);
};

export const searchActions = (list: Product[], searchObj: SearchParams) => {
  const {
    query, sort, page = '1', perPage = '16',
  } = searchObj;

  let newList = list;

  if (sort !== null) {
    newList = SortList(list, sort);
  }

  if (query) {
    newList = filterByQuery(list, query);
  }

  if (page) {
    newList = sliceProductList(newList, page, perPage);
  }

  return newList;
};
