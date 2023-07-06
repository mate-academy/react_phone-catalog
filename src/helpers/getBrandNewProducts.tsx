import { Product } from '../types/Product';

export const getBrandNewProducts = (products: Product[]) => {
  const brandNewProducts = [...products]
    .filter(product => !product.discount)
    .sort((a, b) => b.price - a.price);

  return brandNewProducts;
};
