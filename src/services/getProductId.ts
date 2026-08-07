// getProductId.ts

import { ProductDetails } from '../types/ProductDetails';

export function getProductId(productId: string): Promise<ProductDetails> {
  const BASE = import.meta.env.BASE_URL;

  return Promise.all([
    // Прибрали перший слеш і використали BASE_URL
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
