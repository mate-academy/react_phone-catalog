import { Phone } from './types/Phone';
import { Tablet } from './types/Tablet';
import { Accessory } from './types/Accessory';
import { Product } from './types/Product';

export function getPhones(): Promise<Phone[]> {
  return fetch('api/phones.json').then(responce => responce.json());
}

export function getTablets(): Promise<Tablet[]> {
  return fetch('api/tablets.json').then(responce => responce.json());
}

export function getAccessories(): Promise<Accessory[]> {
  return fetch('api/accessories.json').then(responce => responce.json());
}

export function getProducts(): Promise<Product[]> {
  return fetch('api/products.json').then(responce => responce.json());
}
