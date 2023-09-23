import { DropDownOptionType } from '../../types/DropDownType';
import { Product } from '../../types/Product';

export const DEFAULT_PER_PAGE_NUMBER = 8;

export const sortingOptions = [
  {
    name: 'Newest',
    value: 'age',
  },
  {
    name: 'Alphabetically',
    value: 'name',
  },
  {
    name: 'Cheapest',
    value: 'price',
  },
];

export const paginationOptions = [
  {
    name: '4',
    value: '4',
  },
  {
    name: '8',
    value: '8',
  },
  {
    name: '16',
    value: '16',
  },
  {
    name: 'All',
    value: 'all',
  },
];

export const parseStringToNumber = (value: string, defaultValue: number) => {
  const result = parseInt(value, 10);

  if (Number.isNaN(result)) {
    return defaultValue;
  }

  return result;
};

export const getPerPageNumber = (
  perPageValue: string,
  productsAmount: number,
) => {
  const fallBackPerPageValue = perPageValue === 'all'
    ? productsAmount
    : DEFAULT_PER_PAGE_NUMBER;

  return parseStringToNumber(perPageValue, fallBackPerPageValue);
};

export const findAppliedValueName = (
  value: string,
  options: DropDownOptionType[],
) => {
  const result = options.find(option => option.value === value);

  return result ? result.name : '';
};

export const getProductsFromQuery = (
  products: Product[],
  query: string,
) => {
  if (!query) {
    return products;
  }

  const modifiedQuery = query.replace(/ /g, '').toUpperCase();

  return products.filter(product => {
    const modifiedName = product.name.replace(/ /g, '').toUpperCase();

    return modifiedName.includes(modifiedQuery);
  });
};

export const getVisibleProducts = (
  products: Product[],
  perPage: number,
  currentPage: number,
) => {
  if (products.length / perPage <= 1) {
    return products;
  }

  const firstVisibleItemIndex = (perPage * (currentPage - 1));
  const lastVisibleItemIndex = firstVisibleItemIndex + perPage - 1;

  return products.filter(
    (...args) => {
      const i = args[1];

      return i >= firstVisibleItemIndex && i <= lastVisibleItemIndex;
    },
  );
};
