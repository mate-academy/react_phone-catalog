import { Categories } from '../types/Categories';
import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';
import { client } from './fetchClient';

export function getProducts() {
  return client.get<Product[]>('/products.json');
}

export function getProductDetails(productId: string) {
  return client.get<ProductDetails>(`/products/${productId}.json`);
}

export function getSuggestedProducts() {
  return client.get<Product[]>('/products.json').then((response) => {
    const shuffledProducts = response.sort(() => Math.random() - 0.5);

    return shuffledProducts;
  });
}

export const getProductsByCategoty = (type: Categories) => {
  return client.get<Product[]>('products.json')
    .then((products => products.filter(
      product => product.category === type,
    )));
};
