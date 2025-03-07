export const BASE_URL = 'https://pdabizha.github.io/react_phone-catalog/';

import { Accessories } from '../types/Accessories';
import { PhonesTablets } from '../types/PhonesTablets';
import { Product } from '../types/Product';

export async function getPhones(): Promise<PhonesTablets[]> {
  const response = await fetch(`${BASE_URL}/api/phones.json`);

  return response.json();
}

export async function getTablets(): Promise<PhonesTablets[]> {
  const response = await fetch(`${BASE_URL}/api/tablets.json`);

  return response.json();
}

export async function getAccessories(): Promise<Accessories[]> {
  const response = await fetch(`${BASE_URL}/api/accessories.json`);

  return response.json();
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/api/products.json`);

  return response.json();
}
