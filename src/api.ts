import { Product } from './types/Product';
import { ProductDetails } from './types/ProductDetails';

// eslint-disable-next-line max-len
const API_URL = 'https://VKdrvtsv.github.io/react_phone-catalog/new/products.json';
// eslint-disable-next-line max-len
const PRODUCT_URL = 'https://VKdrvtsv.github.io/react_phone-catalog/new/products/';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getProducts(): Promise<Product[]> {
  return wait(500)
    .then(() => fetch(API_URL))
    .then(response => response.json());
}

export async function getProduct(productID: string): Promise<ProductDetails> {
  return wait(500)
    .then(() => fetch(`${PRODUCT_URL}${productID}.json`))
    .then(response => response.json());
}
