import { AllProducts } from '../../../shared/types/AllProduct/AllProduct';

export const productFilterByNew = (products: AllProducts[]) => {
  if (products.length === 0) {
    return [];
  }

  return products.sort((a, b) => b.year - a.year);
};
