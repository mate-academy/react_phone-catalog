import { Card } from '../../../types/Card';

export function getSuggestedProducts(products: Card[]): Card[] {
  const suggestedProducts: Card[] = [...products];

  for (let i = suggestedProducts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [suggestedProducts[i], suggestedProducts[j]] = [
      suggestedProducts[j],
      suggestedProducts[i],
    ];
  }

  return suggestedProducts.slice(0, 20);
}
