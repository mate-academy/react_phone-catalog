import { AllProducts } from '../../../shared/types/AllProducts/AllProducts';

export const productFilterByNew = (products: AllProducts[]): AllProducts[] => {
  return products.sort((a, b) => b.year - a.year).slice(0, 70);
};
