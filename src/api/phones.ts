import { ProductDetails } from '../types/ProductDetails';

export async function getPhones(): Promise<ProductDetails[]> {
  const responsePhones = await fetch('./api/phones.json');
  const dataProducts = await responsePhones.json();

  return dataProducts;
}
