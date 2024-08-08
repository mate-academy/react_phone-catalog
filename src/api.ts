import { Device } from './type/Device';
import { Products } from './type/Products';

// const API_URL = 'https://mate-academy.github.io/react_phone-catalog/_new';
const API_URL = 'https://Eater228.github.io/react_phone-catalog/api/';

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

async function fetchDevice(resource: string): Promise<Device[]> {
  return wait(500)
    .then(() => fetch(`${API_URL}/${resource}.json`))
    .then(response => response.json());
}

export async function getDevice(resource: string): Promise<Device[]> {
  return fetchDevice(resource);
}
