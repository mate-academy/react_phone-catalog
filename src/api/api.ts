import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

export const NOT_FOUND = 'Product not found';

const BASE_URL = `${import.meta.env.BASE_URL}api`;

export function getProducts(): Promise<Product[]> {
  return fetch(`${BASE_URL}/products.json`).then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    return response.json();
  });
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
      .sort(() => 0.5 - Math.random())
      .slice(0, count),
  );
}
