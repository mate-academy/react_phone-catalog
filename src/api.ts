import { Product } from './types/Product';
import products from '../public/api/products.json';
import phones from '../public/api/phones.json';
import accessories from '../public/api/accessories.json';
import tablets from '../public/api/tablets.json';
import { Accessory, Phone, Tablet } from './types/ProductDetails';

const delay = () => new Promise(resolve => setTimeout(resolve, 500));

export function getProducts(): Promise<Product[]> {
  return delay().then(() => products);
}

export function getPhones(): Promise<Phone[]> {
  return delay().then(() => phones);
}

export function getAccessories(): Promise<Accessory[]> {
  return delay().then(() => accessories);
}

export function getTablets(): Promise<Tablet[]> {
  return delay().then(() => tablets);
}

export function getSuggestedProducts(): Promise<Product[]> {
  const arr = [...products];

  return delay().then(() => {
    return arr.sort(() => 0.5 - Math.random());
  });
}
