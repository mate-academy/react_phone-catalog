import { AllProducts } from '../types/AllProduct/AllProduct';

export const productFilterByCategory = (
  products: AllProducts[],
  path: string,
) => {
  scrollTo(0, 0);

  return products.filter(product => product.category === path.replace('/', ''));
};
