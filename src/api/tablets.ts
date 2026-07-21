import { ProductDetails } from '../types/ProductDetails';

export async function getTablets(): Promise<ProductDetails[]> {
  const responseTablets = await fetch('./api/tablets.json');
  const dataProducts = await responseTablets.json();

  return dataProducts;
}
