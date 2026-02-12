import { AllProducts } from '../../../shared/types/AllProducts/AllProducts';

export const productFilterByNew = (products: AllProducts[]): AllProducts[] => {
  if (products.length === 0) {
    return [];
  }

  return [...products].sort((a, b) => b.year - a.year).slice(0, 70);
};
