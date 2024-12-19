import { ProductType } from '../types/ProductType';
import { SortType } from '../types/SortType';

const apiBase = `http://localhost:5173/api`;

const productsJson = `${apiBase}/products.json`;
const accessoriesJson = `${apiBase}/accessories.json`;
const phonesJson = `${apiBase}/phones.json`;
const tabletsJson = `${apiBase}/tablets.json`;

interface Options {
  maxLength?: number;
  sortBy?: SortType;
  filter?: string;
}

const getData = async (jsonPath: string) => {
  const content = await fetch(jsonPath);

  return content.json();
};

export const getProducts = async (
  options: Options = { maxLength: 16 },
  category?: string,
) => {
  let products: ProductType[] = await getData(productsJson);

  if (category) {
    products = products.filter(product => product.category === category);
  }

  if (!options.sortBy) {
    products = products.sort(
      (product1, product2) => product2.year - product1.year,
    );
  }

  if (options.sortBy === SortType.discount) {
    products = products.sort(
      (product1, product2) =>
        product2.fullPrice -
        product2.price -
        (product1.fullPrice - product1.price),
    );
  }

  if (options.maxLength) {
    products = products.slice(0, options.maxLength);
  }

  return products;
};

export const getAccessories = (options?: Options) => {
  return getProducts(options, accessoriesJson);
};

export const getPhones = (options?: Options) => {
  return getProducts(options, 'phones');
};

export const getTablets = (options?: Options) => {
  return getProducts(options, tabletsJson);
};
