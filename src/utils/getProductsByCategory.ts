import { Product, ProductCategory } from '../types/types';

export const getProductsByCategory = (
  products: Product[],
  currentCategory?: ProductCategory | string,
) => {
  return products.filter(({ category }) =>
    currentCategory ? category === currentCategory : true,
  );
};
