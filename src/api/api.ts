import { Accessory } from '../types/AccessorieTypes';
import { Phone } from '../types/PhoneTypes';
import { Product } from '../types/ProductTypes';
import { Tablet } from '../types/TabletType';

const API_URL = `api/`;

export function getPhones(): Promise<Phone[]> {
  return fetch(API_URL + 'phones.json').then(res => res.json());
}

export function getAccessories(): Promise<Accessory[]> {
  return fetch(API_URL + 'accessories.json').then(res => res.json());
}

export function getTablets(): Promise<Tablet[]> {
  return fetch(API_URL + 'tablets.json').then(res => res.json());
}

export function getProducts(): Promise<Product[]> {
  return fetch(API_URL + 'products.json').then(res => res.json());
}

export function getSuggestedProducts(count: number = 4): Promise<Product[]> {
  return fetch(API_URL + 'products.json')
    .then(res => res.json())
    .then((products: Product[]) => {
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    });
}
