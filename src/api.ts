import { Accessories } from './types/AccessoriesType';
import { Phone } from './types/PhoneType';
import { Product } from './types/ProductsType';
import { Tablet } from './types/TabletType';

const BASE_URL = import.meta.env.VITE_PUBLIC_URL
  ? import.meta.env.VITE_PUBLIC_URL + '/api/'
  : '/api/';

export async function getPhones(): Promise<Phone[]> {
  const response = await fetch(BASE_URL + 'phones.json');

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status}`);
  }

  return response.json();
}

export async function getTablets(): Promise<Tablet[]> {
  const response = await fetch(BASE_URL + 'tablets.json');

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status}`);
  }

  return response.json();
}

export async function getAccessories(): Promise<Accessories[]> {
  const response = await fetch(BASE_URL + 'accessories.json');

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status}`);
  }

  return response.json();
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(BASE_URL + 'products.json');

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status}`);
  }

  return response.json();
}
