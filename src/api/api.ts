import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

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
        throw new Error('Category not found');
      }

      return response.json();
    })
    .then((products: ProductDetails[]) => {
      const product = products.find(p => p.id === productId);

      if (!product) {
        throw new Error('Product not found');
      }

      return product;
    });
}
