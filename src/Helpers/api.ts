import { Product } from './Types/Product';
import { ProductDescription } from './Types/ProductDetails';

const BASE_API_URL = 'https://mate-academy.github.io/react_phone-catalog/api/';
const WAIT_DELAY = 500;

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export function getProducts(): Promise<Product[]> {
  return wait(WAIT_DELAY)
    .then(() => fetch(`${BASE_API_URL}products.json`))
    .then(response => response.json());
}

export function getProductDetails(productId: string)
  : Promise<ProductDescription> {
  return wait(WAIT_DELAY)
    .then(() => fetch(`${BASE_API_URL}products/${productId}.json`))
    .then(response => response.json());
}

export function getPhones(): Promise<Product[]> {
  return getProducts()
    .then(products => products.filter(product => product.type === 'phone'));
}

export function getTablets(): Promise<Product[]> {
  return getProducts()
    .then(products => products.filter(product => product.type === 'tablet'));
}

export function getAccessories(): Promise<Product[]> {
  return getProducts()
    .then(products => products.filter(product => product.type === 'accessory'));
}
