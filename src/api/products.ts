/* eslint-disable max-len */

const API_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/products';

export function getProducts() {
  return fetch(`${API_URL}.json`)
    .then(res => res.json());
}

export function getProduct(productId: string) {
  return fetch(`${API_URL}/${productId}.json`)
    .then(res => res.json());
}
