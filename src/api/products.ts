import { Product } from '../types/Product';

export async function getProducts(): Promise<Product[]> {
  const responseProducts = await fetch('../api/products.json');
  const dataProducts = await responseProducts.json();

  return dataProducts;
}
