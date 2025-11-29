import { PhoneModel, AccessoriesModel } from './types/model';

import { Product } from './types/products';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getPhones(): Promise<PhoneModel[]> {
  return wait(500)
    .then(() => fetch('/api/phones.json'))
    .then(response => response.json());
}

export async function getTablets(): Promise<PhoneModel[]> {
  return wait(500)
    .then(() => fetch('/api/tablets.json'))
    .then(response => response.json());
}

export async function getAccessories(): Promise<AccessoriesModel[]> {
  return wait(3000)
    .then(() => fetch('/api/accessories.json'))
    .then(response => response.json());
}

export async function getProducts(): Promise<Product[]> {
  return wait(3000)
    .then(() => fetch('/api/products.json'))
    .then(response => response.json());
}
