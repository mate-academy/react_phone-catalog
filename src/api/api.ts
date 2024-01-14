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
