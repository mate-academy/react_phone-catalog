import { Product } from '../types/product';
import { ProductDetailsType } from '../types/productDetailsType';
import { client } from '../utils/fetchClient';

export function getProducts() {
  return client.get<Product[]>('/products.json');
}

export function getProductDetails(productId: string) {
  return client.get<ProductDetailsType>(`/products/${productId}.json`);
}

export function getSuggestedProducts() {
  return client.get<Product[]>('/products.json')
    .then(response => {
      const shuffledProducts = response.sort(() => Math.random() - 0.5);

      return shuffledProducts;
    });
}
