import { Product } from '../types/Product';
import { client } from './httpClient';

export function getAllProducts() {
  return client.get<Product[]>('/products.json');
}

export async function getProductById(id: string) {
  return client.get<Product>(`/products/${id}.json`);
}

export function getHotPriceProducts(): Promise<Product[]> {
  return getAllProducts()
    .then(allProducts => allProducts.filter(product => product.discount > 0))
    .then(filteredProducts =>
      filteredProducts.sort((a, b) => {
        const discountValueA = a.price - (a.price * a.discount) / 100;
        const discountValueB = b.price - (b.price * b.discount) / 100;

        return discountValueB - discountValueA;
      }),
    );
}
