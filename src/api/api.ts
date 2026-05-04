import { Accessorie } from '../types/Accessories';
import { Phone } from '../types/Phone';
import { Phones } from '../types/Phones';
import { Products } from '../types/Products';
import { Tablet } from '../types/Tablets';

const API_URL_PHONES = '/api/phones.json';
const API_URL_TABLETS = '/api/tablets.json';
const API_URL_PRODUCTS = '/api/products.json';
const API_URL_ACCESSORIES = '/api/accessories.json';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getPhones(): Promise<Phones[]> {
  await wait(500);
  const res = await fetch(API_URL_PHONES);

  if (!res.ok) {
    throw new Error(`Failed to load phones: ${res.status}`);
  }

  const data = await res.json();

  return data as Phones[];
}

export async function getTablets(): Promise<Tablet[]> {
  await wait(500);
  const res = await fetch(API_URL_TABLETS);

  if (!res.ok) {
    throw new Error(`Failed to load phones: ${res.status}`);
  }

  const data = await res.json();

  return data as Tablet[];
}

export async function getProducts(): Promise<Products[]> {
  await wait(500);
  const res = await fetch(API_URL_PRODUCTS);

  if (!res.ok) {
    throw new Error(`Failed to load phones: ${res.status}`);
  }

  const data = await res.json();

  return data as Products[];
}

export async function getAccessories(): Promise<Accessorie[]> {
  await wait(500);
  const res = await fetch(API_URL_ACCESSORIES);

  if (!res.ok) {
    throw new Error(`Failed to load phones: ${res.status}`);
  }

  const data = await res.json();

  return data as Accessorie[];
}

export async function getProductById(id: string): Promise<Phone | null> {
  if (!id) {
    throw new Error('id is required');
  }

  await wait(500);
  const res = await fetch(`${API_URL_PRODUCTS}/${id}`);

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`Failed to load product: ${res.status}`);
  }

  const data = await res.json();

  return data as Phone;
}
