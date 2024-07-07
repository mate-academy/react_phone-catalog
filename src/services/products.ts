import { Product } from '../types/Product';
import { getData } from './httpClient';

export function getPhones() {
  return getData<Product[]>('/phones.json');
}

export function getTablets() {
  return getData<Product[]>('/tablets.json');
}

export function getAccessories() {
  return getData<Product[]>('/accessories.json');
}

export function getProducts() {
  return getData<Product[]>('/products.json');
}
