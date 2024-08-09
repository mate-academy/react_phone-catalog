import { Product } from '../types/Product';
import { CategoryProduct } from '../types/CategoryProduct';

const BASE_URL = 'https://NastyaSid.github.io/react_phone-catalog/api';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

const handleResponse = (response: Response) => {
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
};

export async function getProducts(): Promise<Product[]> {
  await wait(400);

  return fetch(BASE_URL + '/products.json').then(handleResponse);
}

export async function getPhones(): Promise<CategoryProduct[]> {
  await wait(400);

  return fetch(BASE_URL + '/phones.json').then(handleResponse);
}

export async function getTablets(): Promise<CategoryProduct[]> {
  await wait(400);

  return fetch(BASE_URL + '/tablets.json').then(handleResponse);
}

export async function getAccessories(): Promise<CategoryProduct[]> {
  await wait(400);

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

  const countProducts = (result: PromiseSettledResult<CategoryProduct[]>) => {
    return result.status === 'fulfilled' ? result.value.length : 0;
  };

  const phones = countProducts(results[0]);
  const tablets = countProducts(results[1]);
  const accessories = countProducts(results[2]);

  return { phones, tablets, accessories };
}
