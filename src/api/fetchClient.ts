import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/products';
const BASE_DELAY = 300;

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export function getProducts(): Promise<Product[]> {
  return wait(BASE_DELAY)
    .then(() => fetch(`${BASE_URL}.json`))
    .then(response => response.json());
}

export function getProduct(url: string): Promise<ProductDetails> {
  return wait(BASE_DELAY)
    .then(() => fetch(`${BASE_URL}/${url}.json`))
    .then(response => response.json());
}

export function getProductsWithoutDeley(): Promise<Product[]> {
  return fetch(`${BASE_URL}.json`)
    .then(response => response.json());
}
