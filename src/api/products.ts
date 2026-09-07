import { delay } from '../utils/delay';

export async function getProducts() {
  await delay(1000);

  const response = await fetch('api/products.json');

  if (!response.ok) {
    throw new Error('Failed to load products');
  }

  return response.json();
}

export async function getProductsDetails(type: string | undefined) {
  await delay(1000);

  const response = await fetch(`api/${type}.json`);

  if (!response.ok) {
    throw new Error('Failed to load product details');
  }

  return response.json();
}
