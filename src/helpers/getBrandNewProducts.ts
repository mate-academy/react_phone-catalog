import { Product } from '../types/Product';

export const getBrandNewProducts = (products:Product[]) => {
  const newProducts = [...products]
    .filter(product => !product.discount)
    .sort((a, b) => b.price - a.price);

  return newProducts;
};
