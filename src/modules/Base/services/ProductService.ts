import productsData from '../../../../public/api/products.json';
import phonesData from '../../../../public/api/phones.json';
import tabletsData from '../../../../public/api/tablets.json';
import accessoriesData from '../../../../public/api/accessories.json';
import { Card } from '../../../types/Card';
import { ProductDetails } from '../../../types/ProductDetails';
import { AccessoryDetails } from '../../../types/AccessoryDetails';

function simulateAsync<T>(data: T, delay: number): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(data), delay));
}

export function getProducts(): Promise<Card[]> {
  let data: Card[] = [];

  if (Array.isArray(productsData)) {
    data = productsData;
  } else if (productsData) {
    data = [productsData];
  }

  return simulateAsync(data, 1000);
}

export function getPhones(): Promise<ProductDetails[]> {
  let data: ProductDetails[] = [];

  if (Array.isArray(phonesData)) {
    data = phonesData;
  } else if (phonesData) {
    data = [phonesData];
  }

  return simulateAsync(data, 1000);
}

export function getTablets(): Promise<ProductDetails[]> {
  let data: ProductDetails[] = [];

  if (Array.isArray(tabletsData)) {
    data = tabletsData;
  } else if (tabletsData) {
    data = [tabletsData];
  }

  return simulateAsync(data, 1000);
}

export function getAccessories(): Promise<AccessoryDetails[]> {
  let data: AccessoryDetails[] = [];

  if (Array.isArray(accessoriesData)) {
    data = accessoriesData;
  } else if (accessoriesData) {
    data = [accessoriesData];
  }

  return simulateAsync(data, 1000);
}

export async function findProduct(key: string, value: string | number) {
  const allProducts = await getProducts();

  return allProducts.find((item: Card) => item[key as keyof Card] === value);
}

export async function findPhone(key: string, value: string | number) {
  const allPhones = await getPhones();

  return allPhones.find(
    (item: ProductDetails) => item[key as keyof ProductDetails] === value,
  );
}

export async function findTablet(key: string, value: string | number) {
  const allTablets = await getTablets();

  return allTablets.find(
    (item: ProductDetails) => item[key as keyof ProductDetails] === value,
  );
}

export async function findAccessory(key: string, value: string | number) {
  const allAccessories = await getAccessories();

  return allAccessories.find(
    (item: AccessoryDetails) => item[key as keyof AccessoryDetails] === value,
  );
}
