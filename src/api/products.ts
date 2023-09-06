/* eslint-disable max-len */

import { Product } from '../types/Product';

const BASE_API_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getProducts(): Promise<Product[]> {
  return wait(500)
    .then(() => fetch(`${BASE_API_URL}/products.json`))
    .then(response => response.json());
}

export async function getProductById(id: string): Promise<Product> {
  return wait(500)
    .then(() => fetch(`${BASE_API_URL}/products/${id}.json`))
    .then(response => response.json());
}
