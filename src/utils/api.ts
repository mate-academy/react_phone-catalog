import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

// eslint-disable-next-line max-len
export const API_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/';
const DELAY_DURATIUON = 500;

function wait(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

export function getProducts(): Promise<Product[]> {
  return wait(DELAY_DURATIUON)
    .then(() => fetch(`${API_URL}products.json`))
    .then((response) => response.json());
}

export function getProductDetails(id: string): Promise<ProductDetails> {
  return wait(DELAY_DURATIUON)
    .then(() => fetch(`${API_URL}products/${id}.json`))
    .then(response => response.json());
}

export function getPhones(): Promise<Product[]> {
  return getProducts()
    .then(products => products.filter(product => product.category === 'phone'));
}

export function getTablets(): Promise<Product[]> {
  return getProducts()
    .then(products => products.filter(
      product => product.category === 'tablet',
    ));
}

export function getAccessories(): Promise<Product[]> {
  return getProducts()
    .then(products => products.filter(
      product => product.category === 'accessory',
    ));
}
