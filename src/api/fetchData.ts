/* eslint-disable no-console */
import { Product } from '../types/Products';

const BASE_URL
  = 'https://mate-academy.github.io/react_phone-catalog/_new';

const request = (url: string) => {
  return fetch(BASE_URL + url)
    .then((res) => {
      if (!res.ok) {
        throw new Error('test');
      }

      return res.json();
    }).catch((error) => {
      console.log(`Error: ${error.message}`);
    });
};

export const getProducts = () => request('/products.json');

export const getSuggestedProducts = (id: string) => request(`/products/${id}.json`);

export const getPhones = () => {
  return getProducts()
    .then((products: Product[]) => {
      return [...products].filter(item => item.category === 'phones');
    });
};

export const getTablets = () => {
  return getProducts()
    .then((products: Product[]) => {
      return [...products].filter(item => item.category === 'tablets');
    });
};

export const getAccessories = () => {
  return getProducts()
    .then((products: Product[]) => {
      return [...products].filter(item => item.category === 'accessories');
    });
};
