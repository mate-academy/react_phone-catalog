import { Product } from '../type';
import { ProductDetails } from '../type/ProductDetails';
import { getData } from '../utils/httpClient';

export function getProducts() {
  return getData<Product[]>('/products.json');
}

export function getProductDetails(productId: string) {
  return getData<ProductDetails>(`/products/${productId}.json`);
}
