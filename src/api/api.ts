import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

export const API_URL
  = 'https://mate-academy.github.io/react_phone-catalog/_new';

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products.json`);
  const products = await response.json();

  await delay(200);

  return products;
}

export async function getProduct(id: string): Promise<ProductDetails> {
  const response = await fetch(`${API_URL}/products/${id}.json`);
  const product = await response.json();

  await delay(200);

  return product;
}
