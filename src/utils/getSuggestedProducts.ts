import { Product } from '../types';

export const getSuggestedProducts = (products: Product[], amount: number) => {
  return [...products]
    .sort(() => (Math.random() > 0.5 ? 1 : -1))
    .slice(0, amount);
};
