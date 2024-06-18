import { Phone } from './type/Phone';
import { Products } from './type/Products';

const API_URL = 'https://mate-academy.github.io/react_phone-catalog/_new';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

async function fetchProducts(): Promise<Products[]> {
  return wait(500)
    .then(() => fetch(`${API_URL}/products.json`))
    .then(response => response.json());
}

export async function getProducts(): Promise<Products[]> {
  return fetchProducts();
}

async function fetchPhone(resource: string): Promise<Phone> {
  return wait(500)
    .then(() => fetch(`${API_URL}/products/${resource}.json`))
    .then(response => response.json());
}

export async function getPhone(resource: string): Promise<Phone> {
  return fetchPhone(resource);
}
