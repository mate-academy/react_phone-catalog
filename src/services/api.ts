import { ProductDetails } from '../types/ProductDetails';
import { Product } from '../types/Product';

const API_URL = './api';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export function getProductAll(): Promise<Product[]> {
  return fetch(API_URL + '/products.json')
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    })
    .then(data => wait(600).then(() => data));
}

export function getPhonesAll(): Promise<ProductDetails[]> {
  return fetch(API_URL + '/phones.json')
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    })
    .then(data => wait(600).then(() => data));
}

export function getTabletsAll(): Promise<ProductDetails[]> {
  return fetch(API_URL + '/tablets.json')
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    })
    .then(data => wait(600).then(() => data));
}

export function getAccessoriesAll(): Promise<ProductDetails[]> {
  return fetch(API_URL + '/accessories.json')
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    })
    .then(data => wait(600).then(() => data));
}
