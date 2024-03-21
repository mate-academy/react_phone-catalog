import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

export const API_URL =
  'https://mate-academy.github.io/react_phone-catalog/_new/';

const delayDuration = 500;

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getProducts(): Promise<Product[]> {
  return wait(delayDuration)
    .then(() => fetch(`${API_URL}products.json`))
    .then(response => response.json());
}

export async function getProductDetails(id: string): Promise<ProductDetails> {
  return wait(delayDuration)
    .then(() => fetch(`${API_URL}products/${id}.json`))
    .then(response => response.json());
}
