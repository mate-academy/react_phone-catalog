/* eslint-disable max-len */

import { Product } from '../types/Product';

const API_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getProducts(): Promise<Product[]> {
  return wait(500)
    .then(() => fetch(API_URL))
    .then(response => response.json());
}
