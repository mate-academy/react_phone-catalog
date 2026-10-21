import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

export const NOT_FOUND = 'Product not found';

const BASE_URL = 'api';

let productsRequest: Promise<Product[]> | null = null;

export function getProducts(): Promise<Product[]> {
  if (!productsRequest) {
    productsRequest = fetch(`${BASE_URL}/products.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        return response.json();
      })
      .catch(error => {
        productsRequest = null;

        throw error;
      });
  }

  return productsRequest;
}

export function getProductById(
  category: string,
  productId: string,
): Promise<ProductDetails> {
  return fetch(`${BASE_URL}/${category}.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error(NOT_FOUND);
      }

      return response.json();
    })
    .then((products: ProductDetails[]) => {
      const product = products.find(p => p.id === productId);

      if (!product) {
        throw new Error(NOT_FOUND);
      }

      return product;
    });
}

export function getSuggestedProducts(
  excludedItemId: string,
  count = 8,
): Promise<Product[]> {
  return getProducts().then(products =>
    products
      .filter(p => p.itemId !== excludedItemId)
      .map(product => ({ product, order: Math.random() }))
      .sort((a, b) => a.order - b.order)
      .slice(0, count)
      .map(({ product }) => product),
  );
}
