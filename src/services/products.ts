import { Product } from '../types/Product';

export function getPhones(): Promise<Product[]> {
  return fetch('http://localhost:3000/api/phones.json').then(response => {
    return response.json();
  });
}

export function getTablets(): Promise<Product[]> {
  return fetch('http://localhost:3000/api/tablets.json').then(response => {
    return response.json();
  });
}

export function getAccessories(): Promise<Product[]> {
  return fetch('http://localhost:3000/api/accessories.json').then(response => {
    return response.json();
  });
}

export function getProducts(): Promise<Product[]> {
  return fetch('http://localhost:3000/api/products.json').then(response => {
    return response.json();
  });
}
