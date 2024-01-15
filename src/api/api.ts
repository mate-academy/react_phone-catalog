// eslint-disable-next-line import/no-cycle
import { client } from '../helpers/fetchProduct';
import { Product } from '../types/Product';
/* eslint-disable max-len */
export const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new';

export const getProducts = () => {
  return client.get<Product[]>('/products.json');
};

export const getPhones = async () => {
  return getProducts()
    .then(products => products
      .filter(product => product.category === 'phones'));
};

export const getTablets = async () => {
  return getProducts()
    .then(products => products
      .filter(product => product.category === 'tablets'));
};

export const getAccessories = async () => {
  return getProducts()
    .then(products => products
      .filter(product => product.category === 'accessories'));
};

export const getHotPriceProducts = (phones: Product[]) => {
  return [...phones]
    .sort((phone1, phone2) => ((1 - (phone1.fullPrice / phone1.price)) * 100)
      - (1 - (phone2.fullPrice / phone2.price)) * 100);
};

export const getBrandNewProducts = (phones: Product[]) => {
  return [...phones]
    .sort((phone1, phone2) => phone2.price - phone1.price);
};
