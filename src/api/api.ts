// eslint-disable-next-line import/no-cycle
import { client } from '../helpers/fetchProducts';
import { Product } from '../types/Product';

export const GITHUB_URL = 'https://github.com/purplefade';

export const BASE_URL
  = 'https://mate-academy.github.io/react_phone-catalog/_new';

export const getProducts = () => {
  return client.get<Product[]>('/products.json');
};

export const getPhones = () => {
  return getProducts()
    .then(products => products
      .filter(product => product.category === 'phones'));
};

export const getTablets = () => {
  return getProducts()
    .then(products => products
      .filter(product => product.category === 'tablets'));
};

export const getAccessories = () => {
  return getProducts()
    .then(products => products
      .filter(product => product.category === 'accessories'));
};

export const getProductDetails = (itemId: string) => {
  return fetch(`${BASE_URL}/products/${itemId}.json`)
    .then(response => response.json());
};

export const getHotPriceProducts = (products: Product[]) => {
  return [...products]
    .sort((a, b) => (b.fullPrice - b.price) - (a.fullPrice - a.price))
    .slice(0, 12);
};

export const getBrandNewProducts = (product: Product[]) => {
  return [...product]
    .sort((a, b) => b.year - a.year)
    .slice(0, 12);
};

export const getSuggestedProducts = (
  products: Product[],
  color: string,
  capacity: string,
) => {
  return products
    .filter(product => product.color === color || product.capacity === capacity)
    .slice(0, 12);
};
