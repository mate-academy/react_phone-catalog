import { DropDownOption } from '../types/DropDownOptions';
import { Product } from '../types/Product';

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

export const getSortedProducts = (products: Product[], sortBy: string) => {
  switch (sortBy) {
    case 'discount':
      return products.sort((a, b) => {
        const discountValueA = a.price * (a.discount / 100);
        const discountValueB = b.price * (b.discount / 100);

        return discountValueB - discountValueA;
      });
    case 'age':
      return products.sort((a, b) => a.age - b.age);
    case 'name':
      return products.sort((a, b) => a.name.localeCompare(b.name));
    case 'price':
      return products.sort((a, b) => {
        const finalValueA = a.price - a.price * (a.discount / 100);
        const finalValueB = b.price - b.price * (b.discount / 100);

        return finalValueA - finalValueB;
      });
    default:
      return products;
  }
};

const generateRandomNumber = (max: number) => {
  return Math.floor(Math.random() * (max + 1));
};

const getRandomProducts = (products: Product[]) => {
  const availableIndexes = products.map((...args) => args[1]);
  const indexes: number[] = [];

  for (let i = 0; i < 8; i += 1) {
    const randomIndex = generateRandomNumber(availableIndexes.length - 1);
    const newIndex = availableIndexes.splice(randomIndex, 1)[0];

    indexes.push(newIndex);
  }

  return indexes.map((randomIndex) => products[randomIndex]);
};

export const filterProducts = (
  filter: string,
  sortBy: string,
  products: Product[],
) => {
  let filteredProducts: Product[] = [];

  switch (filter) {
    case 'discount':
      filteredProducts = products.filter(product => product.discount > 0);
      break;

    case 'no-discount':
      filteredProducts = products.filter(product => product.discount === 0);
      break;

    case 'random':
      filteredProducts = getRandomProducts(products);
      break;

    default:
      filteredProducts = products;
  }

  return getSortedProducts(filteredProducts, sortBy);
};

export const generateSlugForProduct = (type: string, id: string) => {
  let directory: string;

  switch (type) {
    case 'phone':
      directory = 'phones';
      break;
    case 'tablet':
      directory = 'tablets';
      break;
    case 'accessory':
      directory = 'accessories';
      break;
    default:
      return '/';
  }

  return `/${directory}/${id}`;
};

export const capitalize = (input: string) => {
  return `${input.charAt(0).toUpperCase()}${input.slice(1).toLowerCase()}`;
};

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

export const findAppliedValueName = (
  value: string,
  options: DropDownOption[],
) => {
  const result = options.find(option => option.value === value);

  return result ? result.name : '';
};
