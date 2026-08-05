// getProductId.ts

import { ProductDetails } from '../types/ProductDetails';

export function getProductId(productId: string): Promise<ProductDetails> {
  return Promise.all([
    fetch('/api/phones.json').then(res => res.json()),
    fetch('/api/tablets.json').then(res => res.json()),
    fetch('/api/accessories.json').then(res => res.json()),
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
