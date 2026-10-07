import { Product } from '../types/Product';

export function getProducts() {
  return fetch('./api/products.json').then(response => {
    if (!response.ok) {
      throw new Error('Failed to load products');
    }

    return response.json();
  });
}

export function getSuggestedProducts(productId: string): Promise<Product[]> {
  return getProducts().then(response => {
    return [...response]
      .filter(product => {
        return product.itemId !== productId;
      })
      .sort(() => Math.random() - 0.5);
  });
}
