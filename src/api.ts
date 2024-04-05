import { ExtendedProduct } from './types/ExtendedProduct';
import { Product } from './types/Product';

const API_URL = 'http://localhost:3000/api/products.json';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getProductsWithDelay(): Promise<Product[]> {
  return wait(500)
    .then(() => fetch(API_URL))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export async function getProducts(): Promise<Product[]> {
  return fetch(API_URL).then(response => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
}

export function getProductById(category: string): Promise<ExtendedProduct[]> {
  return fetch(`http://localhost:3000/api/${category}.json`).then(response => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
}

export const getProductsByCategoryWithDelay = (category: string) => {
  return getProductsWithDelay().then(products => {
    return products.filter(product => product.category === category);
  });
};
