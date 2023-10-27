import { PhoneDetails } from '../types/PhoneDetails';
import { Product } from '../types/Product';

export const BASE_API_URL
  = 'https://mate-academy.github.io/react_phone-catalog/_new/';
export const productsURL
  = 'products.json';

export const phoneDetailsURL
  = 'products/';

export function getFromServer<T>(url: string): Promise<T> {
  const URL = `${BASE_API_URL}/${url}`;

  return fetch(URL)
    .then(response => {
      if (response.ok) {
        const contentType = response.headers.get('Content-Type');

        if (contentType && contentType.includes('text/html')) {
          return null;
        }
      }

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      return response.json();
    });
}

function getSale(product: Product) {
  return product.fullPrice - product.price;
}

export function getProducts() {
  return getFromServer<Product[]>(productsURL);
}

export function getPhones() {
  return getProducts()
    .then(newProducts => newProducts
      .filter(product => product.category === 'phones'));
}

export function getTablets() {
  return getProducts()
    .then(newProducts => newProducts
      .filter(product => product.category === 'tablet'));
}

export function getAccessories() {
  return getProducts()
    .then(newProducts => newProducts
      .filter(product => product.category === 'accessory'));
}

export function getHotPriceProducts() {
  return getProducts()
    .then(newProducts => newProducts
      .sort((product1, product2) => getSale(product1) - getSale(product2))
      .slice(0, 20));
}

export function getBrandNewProducts() {
  return getProducts()
    .then(newProducts => newProducts
      .sort((product1, product2) => product2.fullPrice - product1.fullPrice)
      .slice(0, 20));
}

export function getProductDetails(productId: string) {
  return getFromServer<PhoneDetails>(`${phoneDetailsURL}/${productId}.json`);
}
