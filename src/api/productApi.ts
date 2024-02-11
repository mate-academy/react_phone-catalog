import { client } from '../helpers/httpClient';
import { Product } from '../types/product';

export function getAllProducts<T>(): Promise<T> {
  return client.get('/products.json');
}

export async function getHotPriceProducts() {
  const products = await client.get<Product[]>('/products.json');

  return products
    .filter(product => product.discount > 0)
    .sort((product1, product2) => {
      const discount1 = (product1.price * (100 - product1.discount)) / 100;
      const discount2 = (product2.price * (100 - product2.discount)) / 100;

      return discount2 - discount1;
    });
}
