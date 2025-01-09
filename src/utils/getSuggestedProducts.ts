import { Product } from '../types/product';

export const getSuggestedProducts = (products: Product[], num: number) => {
  const shuffled = [...products].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
};
