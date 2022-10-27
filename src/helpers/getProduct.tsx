import { DetailProduct } from '../types/DetailProduct';

// eslint-disable-next-line max-len
const API_URL = 'https://mate-academy.github.io/react_phone-catalog/api/products/';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getProduct(productId: string): Promise<DetailProduct> {
  // return fetch(API_URL)
  //   .then(response => response.json());

  return wait(500)
    .then(() => fetch(`${API_URL}/${productId}.json`))
    .then(response => response.json());
}
