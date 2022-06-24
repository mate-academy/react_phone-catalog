/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable max-len */
const lodash = require('lodash');

const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/api/products.json';
const PRODUCT_URL = 'https://mate-academy.github.io/react_phone-catalog/api/products/';

export function getProducts():Promise<Product[]> {
  return fetch(BASE_URL)
    .then(response => response.json());
}

export function getHotPriceProducts():Promise<Product[]> {
  return fetch(BASE_URL)
    .then(response => response.json())
    .then(products => products.filter((product:Product) => {
      return product.discount !== 0;
    }))
    .then(discountProducts => discountProducts.sort((a:Product, b:Product) => {
      return (
        ((b.price - (b.price * (1 - b.discount / 100))) - (a.price - a.price * (1 - a.discount / 100)))
      );
    }));
}

export function getBrandNewProducts():Promise<Product[]> {
  return fetch(BASE_URL)
    .then(response => response.json())
    .then(products => products.filter((product:Product) => {
      return product.discount === 0;
    }))
    .then(newProducts => newProducts.sort((a:Product, b:Product) => {
      return (
        b.age - a.age
      );
    }));
}

export function getPhones():Promise<Product[]> {
  return fetch(BASE_URL)
    .then(response => response.json())
    .then(products => products.filter((product:Product) => {
      return product.type === 'phone';
    }));
}

export function getTablets():Promise<Product[]> {
  return fetch(BASE_URL)
    .then(response => response.json())
    .then(products => products.filter((product:Product) => {
      return product.type === 'tablet';
    }));
}

export function getAccessories():Promise<Product[]> {
  return fetch(BASE_URL)
    .then(response => response.json())
    .then(products => products.filter((product:Product) => {
      return product.type === 'accessories';
    }));
}

export function getSelectedProduct(productId:string | undefined):Promise<SelectedProduct> {
  return fetch(`${PRODUCT_URL}/${productId}.json`)
    .then(response => response.json());
}

export function getSuggestedProducts():Promise<Product[]> {
  return fetch(BASE_URL)
    .then(response => response.json())
    .then(random => lodash.sampleSize(random, 8));
}
