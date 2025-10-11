import { CategoryType } from './types/Category';
import { Product } from './types/Product';

// eslint-disable-next-line operator-linebreak
const API_URL =
  // eslint-disable-next-line max-len
  'https://raw.githubusercontent.com/mate-academy/react_phone-catalog/refs/heads/master/public/api/products.json';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getProducts(): Promise<Product[]> {
  return wait(500)
    .then(() => fetch(API_URL))
    .then(response => response.json());
}

export async function getProductById(category: CategoryType) {
  return wait(500)
    .then(() => fetch(`./api/${category}.json`))
    .then(response => response.json());
}
