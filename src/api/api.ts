import { Phone, Product } from './types';

export async function getPhones(): Promise<Phone[]> {
  const response = await fetch('/api/phones.json');

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const result = await response.json();

  return result;
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch('/api/products.json');

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const result = await response.json();

  return result;
}
