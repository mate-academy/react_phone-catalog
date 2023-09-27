import { Phone } from '../types/phone';
import { Product } from '../types/product';

const apiUrl = 'http://localhost:3000/';
const phonesUrl = '_new/products.json';
const productsUrl = 'api/products.json';

function getDiscount(product: Phone) {
  return product.fullPrice - product.price;
}

function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export function getFromServer<T>(url: string): Promise<T> {
  const URL = `${apiUrl}/${url}`;

  return wait(1000)
    .then(() => fetch(URL))
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      return response.json();
    });
}

export function getPhones() {
  return getFromServer<Phone[]>(phonesUrl);
}

export function getProducts() {
  return getFromServer<Product[]>(productsUrl);
}

export function getHotPriceProducts() {
  return getPhones()
    .then(products => products.sort((prod1, prod2) => {
      return getDiscount(prod2) - getDiscount(prod1);
    }).slice(0, 20));
}

export function getBrandNewProducts() {
  return getPhones()
    .then(products => products.sort((prod1, prod2) => {
      return prod2.fullPrice - prod1.fullPrice;
    }).slice(0, 20));
}

export function getTablets() {
  return getProducts()
    .then(products => products.filter(product => product.type === 'tablet'));
}

export function getAccessories() {
  return getProducts()
    .then(products => products.filter(product => product.type === 'accessory'));
}
