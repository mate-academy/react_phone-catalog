import { Product } from '../types/Product';

const API_URL = '/api/products.json';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
};

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getProducts(): Promise<Product[]> {
  return wait(500)
    .then(() => fetch(API_URL))
    .then(response => response.json());
}

export async function updateProduct(data: unknown): Promise<Product[]> {
  const options = {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: DEFAULT_HEADERS,
  };

  return wait(500)
    .then(() => fetch(API_URL, options))
    .then(response => response.json());
}
