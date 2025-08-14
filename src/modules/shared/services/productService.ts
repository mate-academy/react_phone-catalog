import products from '../../../../public/api/products.json';
import phones from '../../../../public/api/phones.json';
import tablets from '../../../../public/api/tablets.json';
import accessories from '../../../../public/api/accessories.json';
import { Card } from '../../../types/Card';
import { ProductDetails } from '../../../types/ProductDetails';
import { AccessoryDetails } from '../../../types/AccessoryDetails';

function simulateAsync<T>(data: T, delay: number): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(data), delay));
}

export function getProducts(): Promise<Card[]> {
  let data: Card[] = [];
  if (Array.isArray(products)) {
    data = products;
  } else if (products) {
    data = [products];
  }
  return simulateAsync(data, 1000);
}

export function getPhones(): Promise<ProductDetails[]> {
  let data: ProductDetails[] = [];
  if (Array.isArray(phones)) {
    data = phones;
  } else if (phones) {
    data = [phones];
  }
  return simulateAsync(data, 1000);
}

export function getTablets(): Promise<ProductDetails[]> {
  let data: ProductDetails[] = [];
  if (Array.isArray(tablets)) {
    data = tablets;
  } else if (tablets) {
    data = [tablets];
  }
  return simulateAsync(data, 1000);
}

export function getAccessories(): Promise<AccessoryDetails[]> {
  let data: AccessoryDetails[] = [];
  if (Array.isArray(accessories)) {
    data = accessories;
  } else if (accessories) {
    data = [accessories];
  }
  return simulateAsync(data, 1000);
}

export async function findProduct(key: string, value: string | number) {
  const products = await getProducts();
  return products.find((item: any) => item[key] === value);
}

export async function findPhone(key: string, value: string | number) {
  const phones = await getPhones();
  return phones.find((item: any) => item[key] === value);
}

export async function findTablet(key: string, value: string | number) {
  const tablets = await getTablets();
  return tablets.find((item: any) => item[key] === value);
}

export async function findAccessory(key: string, value: string | number) {
  const accessories = await getAccessories();
  return accessories.find((item: any) => item[key] === value);
}
