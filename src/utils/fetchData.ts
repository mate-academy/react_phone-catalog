import { CatalogProduct } from '../types/CatalogProduct';

/* eslint-disable max-len */
const NEW_PRODUCTS_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';
const PRODUCT_DETAILS = 'https://mate-academy.github.io/react_phone-catalog/_new/products/';

export async function getProducts(): Promise<CatalogProduct[]> {
  return fetch(NEW_PRODUCTS_URL)
    .then(response => response.json());
}

export async function getProductDetails(productId: string) {
  return fetch(`${PRODUCT_DETAILS}${productId}.json`)
    .then(response => response.json());
}
