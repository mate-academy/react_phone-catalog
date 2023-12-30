import { DetailType } from '../types/DetailType';
import { ProductType } from '../types/ProductType';
import { BASE_URL } from './constants';
import { getDiscountAmount, hasDiscount } from './discount';

const delay = 500;

export async function getProducts(): Promise<ProductType[]> {
  return new Promise(resolve => setTimeout(resolve, delay))
    .then(() => fetch(`${BASE_URL}/products.json`))
    .then(response => response.json());
}

export async function getProductDetails(
  phoneId: string | null,
): Promise<DetailType> {
  return new Promise(resolve => setTimeout(resolve, delay))
    .then(() => fetch(`${BASE_URL}/products/${phoneId}.json`))
    .then(response => response.json());
}

export async function getHotPriceProducts() {
  return getProducts()
    .then(products => products
      .filter(product => hasDiscount(product))
      .sort((a, b) => getDiscountAmount(b) - getDiscountAmount(a)));
}

export async function getNewModelsProducts() {
  return getProducts()
    .then(products => products
      .sort((a, b) => b.year - a.year)
      .slice(0, 8));
}

export async function getProductsByCategory(category: string) {
  return getProducts()
    .then(products => products
      .filter(product => product.category === category));
}
