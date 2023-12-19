import { Product } from '../types/Product';

const BASE_API_URL
  = 'https://mate-academy.github.io/react_phone-catalog/_new/products';

export const getAllProducts = (): Promise<Product[]> => {
  return fetch(`${BASE_API_URL}.json`)
    .then(response => response.json());
};

export const getHotPriceProducts = () => {
  return getAllProducts()
    .then(products => products
      .filter(product => product.fullPrice > product.price)
      .sort((a, b) => (b.fullPrice - b.price) - (a.fullPrice - a.price))
      .slice(0, 12));
};

export const getBrandNewProducts = () => {
  return getAllProducts()
    .then(products => products
      .sort((a, b) => b.fullPrice - a.fullPrice)
      .slice(0, 12));
};

export const getSimilarProducts = (color: string, capacity: string) => {
  return getAllProducts()
    .then(products => products
      .filter(product => product.color === color
        || product.capacity === capacity)
      .slice(0, 12));
};

export const getPhones = () => {
  return getAllProducts()
    .then(products => products
      .filter(product => product.category === 'phones'));
};

export const getTablets = () => {
  return getAllProducts()
    .then(products => products
      .filter(product => product.category === 'tablets'));
};

export const getAccessories = () => {
  return getAllProducts()
    .then(products => products
      .filter(product => product.category === 'accessories'));
};

export const getProductDetails = (itemId: string) => {
  return fetch(`${BASE_API_URL}/${itemId}.json`)
    .then(response => response.json());
};
