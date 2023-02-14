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

export const findApliedValueName = (
  value: string,
  options: DropDownOptionType[],
) => {
  const result = options.find(option => option.value === value);

  return result ? result.name : '';
};

export const parseStringToNumber = (value: string, defaultValue: number) => {
  const result = parseInt(value, 10);

  if (Number.isNaN(result)) {
    return defaultValue;
  }

  return result;
};

export const getVisibleProducts = (
  products: Product[],
  perPage: number,
  selectedPage: number,
) => {
  if ((products.length / perPage) <= 1) {
    return products;
  }

  const firstVisibleItemIndex = (perPage * (selectedPage - 1));
  const lastVisibleItemIndex = firstVisibleItemIndex + perPage - 1;

  return products.filter(
    (...args) => {
      const i = args[1];

      return i >= firstVisibleItemIndex && i <= lastVisibleItemIndex;
    },
  );
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

export const getProductsFromQuery = (products: Product[], query: string) => {
  if (!query) {
    return products;
  }

  const preparedQuery = query.replace(/ /g, '').toUpperCase();

  return products.filter(({ name }) => {
    const preparedName = name.replace(/ /g, '').toUpperCase();

    return preparedName.includes(preparedQuery);
  });
};
