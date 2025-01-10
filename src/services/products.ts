import { Product } from '../types/Product';
import { getData } from './httpClient';

export function getPhones(): Promise<Product[]> {
  return getData('/phones.json');
}

export function getTablets(): Promise<Product[]> {
  return getData('/tablets.json');
}

export function getAccessories(): Promise<Product[]> {
  return getData('/accessories.json');
}

export function getProducts(): Promise<Product[]> {
  return getData('/products.json');
}
