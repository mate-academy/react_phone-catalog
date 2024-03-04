import { Product } from './type/Product';
import { ProductDetails } from './type/ProductDetails';
import { SortParamKeys } from './type/Sort';

// eslint-disable-next-line max-len
export const BASE_URL =
  'https://mate-academy.github.io/react_phone-catalog/_new/';

export function getData<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url).then(response => response.json());
}

export const getProducts = (): Promise<Product[]> => {
  return getData<Product[]>('products.json');
};

export const getCurrentProduct = (currentId: string) => {
  return getData<ProductDetails>(`products/${currentId}.json`);
};

export const getSuggestedProducts = () => {
  return getProducts().then(products =>
    products.sort(() => Math.random() - 0.5).slice(0, 16),
  );
};

export const getDiscount = (price: number, discount: number) => {
  return (price * discount) / 100;
};

export const getHotPriceProducts = () => {
  return getProducts().then(products =>
    products
      .filter(product => product.fullPrice - product.price > 0)
      .sort(
        (productFirst, productSecond) =>
          productSecond.fullPrice -
          productSecond.price -
          (productFirst.fullPrice - productFirst.price),
      ),
  );
};

export const getBrandNewProducts = () => {
  return getProducts().then(products =>
    products
      .filter(product => product.year >= 2019)
      .sort(
        (productFirst, productSecond) =>
          productSecond.fullPrice - productFirst.price,
      ),
  );
};

export const getPhones = () => {
  return getProducts().then(products =>
    products.filter(product => product.category === 'phones'),
  );
};

export const getTablets = () => {
  return getProducts().then(products =>
    products.filter(product => product.category === 'tablets'),
  );
};

export const getAccessories = () => {
  return getProducts().then(products =>
    products.filter(product => product.category === 'accessories'),
  );
};

export const normalizeText = (text: string | null) => {
  if (!text) {
    return '';
  }

  return text.toLowerCase().trim();
};

export const getProductsFilter = (
  listProducts: Product[],
  sortBy: SortParamKeys,
  query: string,
) => {
  let productsFilter = [...listProducts];

  if (query) {
    productsFilter = productsFilter.filter(product =>
      normalizeText(product.name).includes(normalizeText(query)),
    );
  }

  switch (sortBy) {
    case 'age':
      return productsFilter.sort((good1, good2) => good2.year - good1.year);
    case 'name':
      return productsFilter.sort((good1, good2) =>
        normalizeText(good1.name).localeCompare(normalizeText(good2.name)),
      );
    case 'price':
      return productsFilter.sort((good1, good2) => good1.price - good2.price);
    default:
      return productsFilter;
  }
};

export const goToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export function getFirstItemGroup(
  currentPage: number,
  countItems: number,
  total: number,
) {
  const number = (currentPage - 1) * countItems;

  return number <= total ? number : 1;
}

export function getLastItemGroup(
  currentPage: number,
  countItems: number,
  total: number,
) {
  const number = (currentPage - 1) * countItems + countItems;

  return number <= total ? number : total;
}

export const getCountPages = (
  totalItems: number,
  countItemsInGroup: number,
) => {
  return Math.ceil(totalItems / countItemsInGroup);
};

export const getNumbers = (from: number, to: number): number[] => {
  const number = [];

  for (let n = from; n <= to; n += 1) {
    number.push(n);
  }

  return number;
};

export const getFirstIndex = (currentPage: number, numberPages: number) => {
  let firtIndex = 0;

  if (currentPage >= 2 && currentPage <= numberPages - 3) {
    firtIndex = currentPage - 2;
  } else if (currentPage > numberPages - 3) {
    firtIndex = numberPages - 3;
  }

  return firtIndex;
};

export const getLastIndex = (currentPage: number, numberPages: number) => {
  let lastIndex = 3;

  if (currentPage <= numberPages - 3 && currentPage >= 2) {
    lastIndex = currentPage + 1;
  } else if (currentPage > numberPages - 3 && currentPage >= 2) {
    lastIndex = numberPages;
  }

  return lastIndex;
};
