import { Phone } from '../Type/Phone';
import { Product } from '../Type/Product';

// eslint-disable-next-line max-len
const API_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getPeople(): Promise<Product[]> {
  return wait(500)
    .then(() => fetch(API_URL))
    .then(response => response.json());
}

export async function getPhones(): Promise<Product[]> {
  const response = await fetch(API_URL);
  const products: Product[] = await response.json();

  const phoneProducts = products.filter((product: Product) => (
    product.category === 'phones'
  ));

  return phoneProducts;
}

export async function getTablets(): Promise<Product[]> {
  const response = await fetch(API_URL);
  const products: Product[] = await response.json();

  const tabletProducts = products.filter((product: Product) => (
    product.category === 'tablet'
  ));

  return tabletProducts;
}

export async function getAccessories(): Promise<Product[]> {
  const response = await fetch(API_URL);
  const products: Product[] = await response.json();

  const accessoriesProducts = products.filter((product: Product) => (
    product.category === 'accessories'
  ));

  return accessoriesProducts;
}

export async function getProduct(productId: string): Promise<Phone> {
  const url = `https://mate-academy.github.io/react_phone-catalog/_new/products/${productId}.json`;
  const response = await fetch(url);
  const product: Phone = await response.json();

  return product;
}
