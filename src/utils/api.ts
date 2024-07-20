import { Product } from '../types/Product';
import { SpecificProduct } from '../types/SpecificProduct';

const BASE_URL = 'https://NastyaSid.github.io/react_phone-catalog/api';

const handleResponse = (response: Response) => {
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
};

export async function getProducts(url: string): Promise<Product[]> {
  return fetch(BASE_URL + url).then(handleResponse);
}

export async function getPhones(): Promise<SpecificProduct[]> {
  return fetch(BASE_URL + '/phones.json').then(handleResponse);
}

export async function getTablets(): Promise<SpecificProduct[]> {
  return fetch(BASE_URL + '/tablets.json').then(handleResponse);
}

export async function getAccessories(): Promise<SpecificProduct[]> {
  return fetch(BASE_URL + '/accessories.json').then(handleResponse);
}

export async function getProductsQuantityByCategory(): Promise<{
  phones: number;
  tablets: number;
  accessories: number;
}> {
  const results = await Promise.allSettled([
    getPhones(),
    getTablets(),
    getAccessories(),
  ]);

  const countProducts = (result: PromiseSettledResult<SpecificProduct[]>) => {
    return result.status === 'fulfilled' ? result.value.length : 0;
  };

  const phones = countProducts(results[0]);
  const tablets = countProducts(results[1]);
  const accessories = countProducts(results[2]);

  return { phones, tablets, accessories };
}
