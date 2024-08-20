import { Products } from './types/Products';
import { Phone } from './types/PhoneType';
import products from './api/products.json';
import phones from './api/phones.json';
import tablets from './api/tablets.json';
import accessories from './api/accessories.json';

function wait(delay: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getProduct(): Promise<Products[]> {
  await wait(500);

  return products as Products[];
}

export async function getDetailedPhones(): Promise<Phone[]> {
  await wait(500);

  return phones as Phone[];
}

export async function getDetailedTablets(): Promise<Phone[]> {
  await wait(500);

  return tablets as Phone[];
}

export async function getDetailedAccessories(): Promise<Phone[]> {
  await wait(500);

  return accessories as Phone[];
}
