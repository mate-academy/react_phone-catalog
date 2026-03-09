import { ProductDetailed, ProductGeneral } from '../types/product';

const API_URL = '/api/';
// const API_URL = '/react_phone-catalog/api/';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getProductsGeneral(): Promise<ProductGeneral[]> {
  return wait(1500)
    .then(() => fetch(`${API_URL}products.json`))
    .then(response => response.json());
}

export async function getProductsByType(
  typeOf: string,
): Promise<ProductDetailed[]> {
  let API_BY_TYPE_URL = '';

  if (typeOf === 'phones') {
    API_BY_TYPE_URL = `${API_URL}phones.json`;
  }

  if (typeOf === 'tablets') {
    API_BY_TYPE_URL = `${API_URL}tablets.json`;
  }

  if (typeOf === 'accessories') {
    API_BY_TYPE_URL = `${API_URL}accessories.json`;
  }

  return wait(1500)
    .then(() => fetch(API_BY_TYPE_URL))
    .then(response => response.json());
}
