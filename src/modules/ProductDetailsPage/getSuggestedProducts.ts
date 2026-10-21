import { Product } from '../../types/Product';

const shuffle = <T>(items: T[]): T[] => {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }

  return result;
};

export const getSuggestedProducts = (
  products: Product[],
  currentId: string,
  category: Product['category'],
  count = 10,
): Product[] => {
  const candidates = products.filter(
    item => item.category === category && item.itemId !== currentId,
  );

  return shuffle(candidates).slice(0, count);
};
