import { DetailType } from '../helpers/types/DetailType';
import { ProductType } from '../helpers/types/ProductType';
import { BASE_URL } from '../helpers/utils/constants';
import {
  getDiscountAmount,
  hasDiscount,
} from '../helpers/getFunctions/discount';

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
