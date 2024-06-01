import { Product } from '../types/types';

export const getYouMayAlsoLikeProducts = (products: Product[]): Product[] => {
  const newArr = products.sort(() => Math.random() - 0.5);

  return newArr.slice(0, 20);
};
