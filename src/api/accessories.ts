import { ProductDetails } from '../types/ProductDetails';

export async function getAccessories(): Promise<ProductDetails[]> {
  const responseAccessories = await fetch('./api/accessories.json');
  const dataProducts = await responseAccessories.json();

  return dataProducts;
}
