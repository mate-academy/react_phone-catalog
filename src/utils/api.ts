import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

const API_URL = '_new';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getProducts(url = '/products.json'): Promise<Product[]> {
  return wait(500)
    .then(() => {
      return fetch(API_URL + url);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      return response.json();
    });
}

export async function getProductById(
  productId: string,
): Promise<ProductDetails> {
  return wait(500)
    .then(() => {
      return fetch(`${API_URL}/products/${productId}.json`);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch product - ${productId}`);
      }

      return response.json();
    });
}

export async function getPhones(allProducts: Product[]): Promise<Product[]> {
  return wait(500).then(() => {
    return allProducts.filter(product => product.category === 'phones');
  });
}

export async function getTablets(allProducts: Product[]): Promise<Product[]> {
  return wait(500).then(() => {
    return allProducts.filter(product => product.category === 'tablets');
  });
}

export async function getAccessories(
  allProducts: Product[],
): Promise<Product[]> {
  return wait(500).then(() => {
    return allProducts.filter(product => product.category === 'accessories');
  });
}
