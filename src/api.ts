import { Phone } from './types/Phone';
import { Product } from './types/Product';

// eslint-disable-next-line operator-linebreak
const API_URL = '/api';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getPhones(): Promise<Phone[]> {
  // keep this delay for testing purpose
  return wait(500)
    .then(() => fetch(`${API_URL}/phones.json`))
    .then(response => response.json());
}

export async function getProducts(): Promise<Product[]> {
  // keep this delay for testing purpose
  return wait(500)
    .then(() => fetch(`${API_URL}/products.json`))
    .then(response => response.json());
}
