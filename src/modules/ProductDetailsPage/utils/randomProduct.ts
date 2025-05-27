import { AllProducts } from '../../../shared/types/AllProducts/AllProducts';

export const getRandomProduct = (
  selectedIds: number[],
  allProducts: AllProducts[],
): AllProducts[] => {
  return allProducts.filter(product => selectedIds.includes(product.id));
};
