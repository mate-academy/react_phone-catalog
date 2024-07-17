import { Product } from '../types/Product';

const BASE_URL = '../../public/api';

const handleResponse = (response: Response) => {
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
};

export async function getProducts(url: string): Promise<Product[]> {
  return fetch(BASE_URL + url).then(handleResponse);
}
