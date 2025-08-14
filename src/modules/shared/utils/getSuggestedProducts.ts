import { Card } from "../../../types/Card";

export function getSuggestedProducts(products: Card[]): Card[] {
  const suggestedProducts: Card[] = [];

  for (const value of products) {
    if (Math.random() < 0.5) {
      suggestedProducts.push(value);
    }
  }

  for (let i = suggestedProducts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [suggestedProducts[i], suggestedProducts[j]] = [
      suggestedProducts[j],
      suggestedProducts[i],
    ];
  }

  return suggestedProducts;
}