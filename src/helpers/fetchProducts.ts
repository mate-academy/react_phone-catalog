import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

const API_URL = 'https://mate-academy.github.io/react_phone-catalog/_new';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

async function request(url: string) {
  return wait(500)
    .then(() => fetch(API_URL + url))
    .then(res => res.json());
}

export function getProductsFromServer():Promise<Product[]> {
  return request('/products.json');
}

// eslint-disable-next-line max-len
export function getProductDetailsFromServer(productId: string):Promise<ProductDetails> {
  return request(`/products/${productId}.json`);
}
