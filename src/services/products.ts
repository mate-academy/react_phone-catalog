import { Product } from '../types/Product';
import { getData } from './httpClient';

export function getPhones() {
  return getData<Product[]>('/api/phones.json');
}

export function getTablets() {
  return getData<Product[]>('/api/tablets.json');
}

export function getAccessories() {
  return getData<Product[]>('/api/accessories.json');
}

export function getProducts() {
  return getData<Product[]>('/api/products.json');
}
