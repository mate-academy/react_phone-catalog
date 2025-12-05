import { PhoneModel, AccessoriesModel } from './types/model';

import { Product } from './types/products';

const BASE_URL = import.meta.env.BASE_URL;

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getPhones(): Promise<PhoneModel[]> {
  const fullUrl = `${BASE_URL}api/phones.json`;
  const correctedUrl = fullUrl.replace('//', '/');

  return wait(500)
    .then(() => fetch(correctedUrl))
    .then(response => response.json());
}

export async function getTablets(): Promise<PhoneModel[]> {
  const fullUrl = `${BASE_URL}api/tablets.json`;
  const correctedUrl = fullUrl.replace('//', '/');

  return wait(500)
    .then(() => fetch(correctedUrl))
    .then(response => response.json());
}

export async function getAccessories(): Promise<AccessoriesModel[]> {
  const fullUrl = `${BASE_URL}api/accessories.json`;
  const correctedUrl = fullUrl.replace('//', '/');

  return wait(500)
    .then(() => fetch(correctedUrl))
    .then(response => response.json());
}

export async function getProducts(): Promise<Product[]> {
  const fullUrl = `${BASE_URL}api/products.json`;
  const correctedUrl = fullUrl.replace('//', '/');

  return wait(3000)
    .then(() => fetch(correctedUrl))
    .then(response => response.json());
}
