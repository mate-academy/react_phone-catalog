import { Accessories } from '../types/Accessories';
import { Phones } from '../types/Phones';
import { Tablets } from '../types/Tablets';
export const getSuggestedProducts = (
  products: (Phones | Tablets | Accessories)[],
  currentId: string, // ID поточного товару
  name: string,
  color: string,
  capacity: string,
) => {
  const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, '');

  const normalizedName = normalize(name);
  const normalizedColor = normalize(color);
  const normalizedCapacity = normalize(capacity);

  const scoredProducts = products
    .filter(prod => prod.id !== currentId)
    .map(prod => {
      let score = 0;

      if (normalize(prod.name).includes(normalizedName)) {
        score += 3;
      }

      if (normalize(prod.color).includes(normalizedColor)) {
        score += 2;
      }

      if (normalize(prod.capacity).includes(normalizedCapacity)) {
        score += 1;
      }

      return { product: prod, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map(item => item.product);

  return scoredProducts;
};
