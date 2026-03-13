import phonesData from './products/phones.json';
import tabletsData from './products/tablets.json';
import accessoriesData from './products/accessories.json';

import type { Product } from '../types/Product';

export async function loadProducts(): Promise<Product[]> {
  const phones: Product[] = phonesData as Product[];
  const tablets: Product[] = tabletsData as Product[];
  const accessories: Product[] = accessoriesData as Product[];

  return [...phones, ...tablets, ...accessories];
}