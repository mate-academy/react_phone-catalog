/* eslint-disable no-console */
import { Phone } from '../types/phone';
import { PhoneDetails } from '../types/phoneDetails';

const apiUrl = 'https://mate-academy.github.io/react_phone-catalog/_new';
const phonesUrl = 'products.json';
const phoneDetailsUrl = 'products';

function getDiscount(product: Phone) {
  return product.fullPrice - product.price;
}

function shuffleArray<T>(array: T[]): T[] {
  return array
    .map((value: T) => ({ value, sortKey: Math.random() }))
    .sort((a, b) => a.sortKey - b.sortKey)
    .map(({ value }) => value);
}

export function getFromServer<T>(url: string): Promise<T> {
  const URL = `${apiUrl}/${url}`;

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

export function getPhones() {
  return getFromServer<Phone[]>(phonesUrl);
}

export function getPhoneDetails(phoneId: string) {
  return getFromServer<PhoneDetails>(`${phoneDetailsUrl}/${phoneId}.json`);
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

export function getSuggestedProducts() {
  return getPhones()
    .then(phones => shuffleArray<Phone>([...phones]).slice(0, 20));
}
