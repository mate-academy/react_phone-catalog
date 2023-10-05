import { Product } from '../types/Product';

/* eslint-disable max-len */
const NEW_PRODUCTS_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';
// const NEW_PRODUCTS_URL = 'D:/Mate_academy/Portfolio/react_phone-catalog/public/_new/products.json';

export async function getProducts(): Promise<Product[]> {
  return fetch(NEW_PRODUCTS_URL)
    .then(response => response.json());
}
