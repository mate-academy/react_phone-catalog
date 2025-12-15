import { Product } from '../types/Product';

export const getSuggestedProducts = (array: Product[], count: number) => {
  const suggested = [...array].sort(() => Math.random() - 0.5);

  return suggested.slice(0, count);
};
