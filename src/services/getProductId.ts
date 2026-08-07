// getProductId.ts

import { ProductDetails } from '../types/ProductDetails';

export function getProductId(productId: string): Promise<ProductDetails> {
  // Гарантуємо, що після BASE_URL завжди є слеш
  const BASE = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  return Promise.all([
    fetch(`${BASE}api/phones.json`).then(res => res.json()),
    fetch(`${BASE}api/tablets.json`).then(res => res.json()),
    fetch(`${BASE}api/accessories.json`).then(res => res.json()),
  ]).then(([phones, tablets, accessories]) => {
    const allDetails: ProductDetails[] = [
      ...phones,
      ...tablets,
      ...accessories,
    ];

    const found = allDetails.find(item => item.id === productId);

    if (!found) {
      throw new Error('Product not found 😕');
    }

    return found;
  });
}
