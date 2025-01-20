import { Category } from '../types/CategoryType';
import { ProductItemType } from '../types/ProductItemType';
import { ProductType } from '../types/ProductType';
import { SortType } from '../types/SortType';

const apiBase = `api`;
const productsJson = `${apiBase}/products.json`;
const accessoriesJson = `${apiBase}/accessories.json`;
const phonesJson = `${apiBase}/phones.json`;
const tabletsJson = `${apiBase}/tablets.json`;

interface Options {
  perPage?: number;
  page?: number;
  sortBy?: SortType;
  filter?: string;
  itemIds?: string[];
  excludeId?: string;
  shuffle?: boolean;
}

const getData = async <T>(jsonPath: string): Promise<T> => {
  const response = await fetch(jsonPath);

  return response.json() as T;
};

const sortProducts = (
  products: ProductType[],
  sortBy?: SortType,
): ProductType[] => {
  if (sortBy === SortType.Discount) {
    return products.sort(
      (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
    );
  }

  if (sortBy === SortType.Oldest) {
    return products.sort((a, b) => a.year - b.year);
  }

  return products.sort((a, b) => b.year - a.year);
};

const filterProductsByCategory = (
  products: ProductType[],
  category?: Category,
): ProductType[] => {
  if (!category) {
    return products;
  }

  return products.filter(product => product.category === category.toString());
};

const limitProducts = (
  products: ProductType[],
  perPage: number = 16,
  page: number = 1,
): ProductType[] => {
  const startIndex = perPage * (page - 1);
  const endIndex = startIndex + perPage;

  return products.slice(startIndex, endIndex);
};

const countPages = (productsCount: number, perPage: number = 16) => {
  return Math.ceil(productsCount / perPage);
};

const filterIds = (products: ProductType[], itemIds?: string[]) => {
  if (!itemIds) {
    return products;
  }

  return products.filter(product => itemIds.includes(product.itemId));
};

const excludeId = (products: ProductType[], excludeId?: string) => {
  if (!excludeId) {
    return products;
  }

  return products.filter(product => product.itemId !== excludeId);
};

const shuffle = (products: ProductType[], shuffle?: boolean) => {
  if (!shuffle) {
    return products;
  }

  return products
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

export const getProducts = async (
  options: Options = { perPage: 16 },
  category?: Category,
): Promise<{
  products: ProductType[];
  pages: number;
  totalProducts: number;
}> => {
  let products = await getData<ProductType[]>(productsJson);

  products = filterProductsByCategory(products, category);

  if (options.shuffle) {
    products = shuffle(products, options.shuffle);
  } else {
    products = sortProducts(products, options.sortBy);
  }

  const totalProducts = products.length;
  const pages = countPages(products.length, options.perPage);

  if (options.itemIds) {
    products = filterIds(products, options.itemIds);
  } else {
    products = limitProducts(products, options.perPage, options.page);
  }

  products = excludeId(products, options.excludeId);

  return { products, pages, totalProducts };
};

export const getProduct = async (
  itemId: string,
): Promise<ProductItemType | undefined> => {
  const paths = [accessoriesJson, phonesJson, tabletsJson];

  const allProducts = await Promise.all(
    paths.map(path => {
      return getData<ProductItemType[]>(path);
    }),
  ).then(results => {
    return results.flat();
  });

  return allProducts.find(product => product.id === itemId);
};

export const getFromLocalStorage = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || '[]');
};

export const setInLocalStorage = (key: string, value: string | Object) => {
  localStorage.setItem(key, JSON.stringify(value));

  window.dispatchEvent(
    new StorageEvent('storage', { storageArea: localStorage }),
  );
};
