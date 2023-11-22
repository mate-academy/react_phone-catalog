/* eslint-disable no-restricted-syntax */
import { DropDownOption } from '../../types/dropDownOption';
import { Params } from '../../types/params';
import { Phone } from '../../types/phone';

export const sortOptions: DropDownOption[] = [
  { name: 'Newest', value: 'age' },
  { name: 'Alphabetically', value: 'name' },
  { name: 'Cheapest', value: 'price' },
];

export const paginationOptions: DropDownOption[] = [
  { name: '4', value: '4' },
  { name: '8', value: '8' },
  { name: '16', value: '16' },
  { name: 'All', value: 'all' },
];

export const getVisibleItems = (
  products: Phone[],
  sortBy: string,
  perPage: string,
  page: number,
): Phone[] => {
  const result = [...products];

  result.sort((prod1, prod2) => {
    switch (sortBy) {
      case 'age':
        return prod2.year - prod1.year;
      case 'name':
        return prod1.name.localeCompare(prod2.name);
      case 'price':
        return prod1.price - prod2.price;
      default:
        throw new Error('Sorting went wrong...');
    }
  });

  if (perPage === 'all') {
    return result;
  }

  const firstItem = (page - 1) * +perPage + 1;
  const lastItem
    = firstItem + +perPage - 1 < result.length
      ? firstItem + +perPage - 1
      : result.length;

  return result.slice(firstItem - 1, lastItem);
};

export function getSearchParams(
  params: Params,
  initialParams?: string | URLSearchParams,
) {
  const searchParams = new URLSearchParams(initialParams);

  for (const [key, value] of Object.entries(params)) {
    if (value === null) {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value);
    }
  }

  return searchParams.toString();
}

export const trimString = (string: string) => {
  return string.trim().toLowerCase();
};

export function filterQuery(items: Phone[], searchQuery: string) {
  if (searchQuery) {
    return items.filter((product) => {
      const trimmedWord = trimString(product.name);
      const queryParts = trimString(searchQuery).split(/[,\s;.]+/);

      return queryParts.every(part => trimmedWord.includes(part));
    });
  }

  return items;
}
