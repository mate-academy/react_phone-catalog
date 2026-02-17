import phonesData from './products/phones.json';
import tabletsData from './products/tablets.json';
import accessoriesData from './products/accessories.json';

import type { Product } from '../types/Product';

export async function loadProducts(): Promise<Product[]> {
  const phones: Product[] = phonesData.map(p => ({
    ...p,
    images: p.images,
  }));

  const tablets: Product[] = tabletsData.map(p => ({
    ...p,
    images: p.images,
  }));

  const accessories: Product[] = accessoriesData.map((p: any) => ({
    ...p,

   
    images: p.images
      ? p.images
      : p.image
        ? [p.image]
        : [],
  }));

  return [...phones, ...tablets, ...accessories];
}