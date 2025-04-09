import { Product } from '../types/products';

const API_URL = 'https://dvdmsk.github.io/react_phone-catalog/api/';

export async function getProducts(): Promise<Product[]> {
  return fetch(`${API_URL}products.json`).then(response => response.json());
}
