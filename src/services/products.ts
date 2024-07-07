import { Product } from '../types/Product';
import { getData } from './httpClient';

export function getPhones(): Promise<Product[]> {
  return getData('/phones.json');
}

export function getTablets(): Promise<Product[]> {
  return fetch('/api/tablets.json').then(response => {
    return response.json();
  });
}

export function getAccessories(): Promise<Product[]> {
  return fetch('/api/accessories.json').then(response => {
    return response.json();
  });
}

export function getProducts(): Promise<Product[]> {
  return fetch('/api/products.json').then(response => {
    return response.json();
  });
}
