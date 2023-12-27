import { ItemDetails, Product } from './types';

const API_URL = 'https://mate-academy.github.io/react_phone-catalog/_new';

export function getProducts(): Promise<Product[]> {
  return fetch(`${API_URL}/products.json`)
    .then(response => response.json());
}

export function getCategoy(category: string) {
  return getProducts()
    .then(products => products
      .filter(item => item.category === category));
}

export function getHotPriceProducts() {
  return getProducts()
    .then(products => products
      .sort((a: Product, b: Product) => {
        const aDiscount = a.fullPrice - a.price;
        const bDiscount = b.fullPrice - b.price;

        return aDiscount - bDiscount;
      }));
}

export function getBrandNewProducts() {
  return getProducts()
    .then(products => products
      .sort((a: Product, b: Product) => b.price - a.price));
}

export function getSuggestedProducts() {
  return getProducts()
    .then(products => products
      .sort(() => 0.5 - Math.random()));
}

export function getProductDetails(
  id: string | undefined,
): Promise<ItemDetails> {
  return fetch(`${API_URL}/products/${id}.json`)
    .then(response => response.json())
    .then();
}
