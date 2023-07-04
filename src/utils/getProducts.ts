/* eslint-disable max-len */

import { Details } from './types/Details';
import { Product } from './types/Product';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export const getProducts = (): Promise<Product[]> => {
  return wait(0)
    .then(() => fetch('https://mate-academy.github.io/react_phone-catalog/_new/products.json'))
    .then(response => response.json());
};

export const getDetails = (id: string | undefined): Promise<Details> => {
  return wait(0)
    .then(() => fetch(`products/${id}.json`))
    .then(response => response.json());
};
