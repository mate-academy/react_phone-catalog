import { AllProducts } from '../types/AllProducts/AllProducts';

export const productFilterByCategory = (
  products: AllProducts[],
  path: string,
): AllProducts[] | [] => {
  return products.filter(el => el.category === path.replace('/', ''));
};
