/* eslint-disable max-len */

const API_URL = 'https://mate-academy.github.io/react_phone-catalog/api/products.json';

export function getProducts() {
  return fetch(API_URL)
    .then(res => res.json());
}
