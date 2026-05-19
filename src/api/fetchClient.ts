import { Product } from '../types/ProductType';
import { AllCategoryType } from '../types/AllCategoryType';

const API_URL_PRODUCT = 'api/products.json';
const API_URL_PHONES = 'api/phones.json';
const API_URL_TABLETS = 'api/tablets.json';
const API_URL_ACCESSORIES = 'api/accessories.json';

export async function getProductData(): Promise<Product[]> {
  return fetch(API_URL_PRODUCT).then(response => response.json());
}

export async function getPhonesData(): Promise<AllCategoryType[]> {
  return fetch(API_URL_PHONES).then(response => response.json());
}

export async function getTabletsData(): Promise<AllCategoryType[]> {
  return fetch(API_URL_TABLETS).then(response => response.json());
}

export async function getAccessoriesData(): Promise<AllCategoryType[]> {
  return fetch(API_URL_ACCESSORIES).then(response => response.json());
}
