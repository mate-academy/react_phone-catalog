/* eslint-disable no-console */

import { Gadget } from './types';

export enum Edirection {
  prev = 'left',
  next = 'right',
}

export const getProducts = async () => {
  const PRODUCTS_URL
  = 'https://mate-academy.github.io/react_phone-catalog/api/products.json';
  const result: Gadget[] = await fetch(PRODUCTS_URL)
    .then((res) => res.json())
    .catch((error) => {
      throw new Error(error.message);
    });

  return result;
};

export const getGadgetDescription = async (model: string) => {
  const PRODUCT_DETAILS
  = 'https://mate-academy.github.io/react_phone-catalog/api/products/';
  const result = await fetch(`${PRODUCT_DETAILS}${model}.json`)
    .then((res) => res.json())
    .catch((e) => new Error(e.message));

  return result;
};
