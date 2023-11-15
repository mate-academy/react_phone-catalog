import { Product } from '../type/Product';
import { ProductDetails } from '../type/ProductDetails';
import { client } from '../utils/fetchClient';

export function getProducts() {
  return client.get<Product[]>('/products.json');
}

export function getProductDetails(phoneId: string | undefined) {
  return client.get<ProductDetails>(`/products/${phoneId}.json`);
}
