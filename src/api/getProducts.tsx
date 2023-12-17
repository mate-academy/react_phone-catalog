import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

// eslint-disable-next-line max-len
const API_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/products';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getProducts(): Promise<Product[]> {
  // keep this delay for testing purpose
  return wait(500)
    .then(() => fetch(`${API_URL}.json`))
    .then(response => response.json());
}

export async function getProductDetails(
  nameProduct: string,
): Promise<ProductDetails> {
  return wait(500)
    .then(() => fetch(`${API_URL}/${nameProduct}.json`))
    .then(response => response.json());
}
