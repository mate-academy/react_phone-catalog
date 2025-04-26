import { Accessory } from '../types/AccessorieTypes';
import { Phone } from '../types/PhoneTypes';
import { Product } from '../types/ProductTypes';
import { Tablet } from '../types/TabletType';

const API_URL = `api/`;

export function getPhones(): Promise<Phone[]> {
  return fetch(API_URL + 'phones.json').then(res => res.json());
}

export function getAccessories(): Promise<Accessory[]> {
  return fetch(API_URL + 'accessorie.json').then(res => res.json());
}

export function getTablets(): Promise<Tablet[]> {
  return fetch(API_URL + 'tablets.json').then(res => res.json());
}

export function getProducts(): Promise<Product[]> {
  return fetch(API_URL + 'products.json').then(res => res.json());
}

export function getProductById(id: string): Promise<Product | null> {
  return getProducts().then(products => {
    const foundProduct = products.find(product => product.itemId === id);
    return foundProduct || null;
  });
}
