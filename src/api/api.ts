/* eslint-disable no-console */
import { Accessorie } from '../types/Accessories';
import { Discounted } from '../types/Discounted';
import { Phone } from '../types/Phone';
import { Products } from '../types/Products';
import { Tablet } from '../types/Tablets';

const BASE_URL = import.meta.env.BASE_URL;

const API_URL_PHONES = `${BASE_URL}api/phones.json`;
const API_URL_TABLETS = `${BASE_URL}api/tablets.json`;
const API_URL_PRODUCTS = `${BASE_URL}api/products.json`;
const API_URL_DISCOUNTED_PRODUCTS = `${BASE_URL}api/products.json`;
const API_URL_ACCESSORIES = `${BASE_URL}api/accessories.json`;

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getPhones(): Promise<Phone[]> {
  await wait(500);
  const res = await fetch(API_URL_PHONES);

  if (!res.ok) {
    throw new Error(`Failed to load phones: ${res.status}`);
  }

  const data = await res.json();

  return data as Phone[];
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

export async function getTabletById(id: string): Promise<Tablet | null> {
  if (!id) {
    throw new Error('id is required');
  }

  await wait(500);
  const res = await fetch(API_URL_TABLETS);

  if (!res.ok) {
    throw new Error(`Failed to load tablet: ${res.status}`);
  }

  const tablets: Tablet[] = await res.json();

  return (
    tablets.find(item => String(item.id) === id || item.namespaceId === id) ??
    null
  );
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

export async function getDiscountedProducts(): Promise<Discounted[]> {
  await wait(500);
  const res = await fetch(API_URL_DISCOUNTED_PRODUCTS);

  if (!res.ok) {
    throw new Error(`Failed to load discounted products: ${res.status}`);
  }

  const data = await res.json();

  return data as Discounted[];
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

export async function getAccessorieById(
  id: string,
): Promise<Accessorie | null> {
  if (!id) {
    throw new Error('id is required');
  }

  await wait(500);
  const res = await fetch(API_URL_ACCESSORIES);

  if (!res.ok) {
    throw new Error(`Failed to load accessorie: ${res.status}`);
  }

  const accessories: Accessorie[] = await res.json();

  return (
    accessories.find(
      item => String(item.id) === id || item.namespaceId === id,
    ) ?? null
  );
}

export async function getProductById(id: string): Promise<Phone | null> {
  if (!id) {
    throw new Error('id is required');
  }

  await wait(500);

  const res = await fetch(API_URL_PRODUCTS);

  if (!res.ok) {
    throw new Error(`Failed to load product: ${res.status}`);
  }

  const products: Products[] = await res.json();
  const product = products.find(
    item => String(item.id) === id || item.itemId === id,
  );

  if (!product) {
    const phonesRes = await fetch(API_URL_PHONES);

    if (!phonesRes.ok) {
      throw new Error(`Failed to load phones: ${phonesRes.status}`);
    }

    const phones: Phone[] = await phonesRes.json();

    return phones.find(phone => String(phone.id) === id) ?? null;
  }

  const phonesRes = await fetch(API_URL_PHONES);

  if (!phonesRes.ok) {
    throw new Error(`Failed to load phones: ${phonesRes.status}`);
  }

  const phones: Phone[] = await phonesRes.json();

  return phones.find(phone => phone.id === product.itemId) ?? null;
}
