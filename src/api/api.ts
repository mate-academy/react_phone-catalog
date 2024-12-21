import { ProductType } from '../types/ProductType';
import { SortType } from '../types/SortType';

const apiBase = `http://localhost:5173/api`;
const productsJson = `${apiBase}/products.json`;

enum Category {
  'phones',
  'accessories',
  'tablets',
}

interface Options {
  maxLength?: number;
  sortBy?: SortType;
  filter?: string;
}

const getData = async (jsonPath: string): Promise<ProductType[]> => {
  const response = await fetch(jsonPath);

  return response.json();
};

const sortProducts = (
  products: ProductType[],
  sortBy?: SortType,
): ProductType[] => {
  if (!sortBy) {
    return products.sort((a, b) => b.year - a.year);
  }

  if (sortBy === SortType.discount) {
    return products.sort(
      (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
    );
  }

  return products;
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
  maxLength?: number,
): ProductType[] => {
  if (!maxLength) {
    return products;
  }

  return products.slice(0, maxLength);
};

export const getProducts = async (
  options: Options = { maxLength: 16 },
  category?: Category,
): Promise<ProductType[]> => {
  let products = await getData(productsJson);

  products = filterProductsByCategory(products, category);
  products = sortProducts(products, options.sortBy);
  products = limitProducts(products, options.maxLength);

  return products;
};

export const getPhones = (options?: Options) => {
  return getProducts(options, Category.phones);
};

export const getAccessories = (options?: Options) => {
  return getProducts(options, Category.accessories);
};

export const getTablets = (options?: Options) => {
  return getProducts(options, Category.tablets);
};
