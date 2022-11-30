import { Product } from '../types/Product';

export const getBrandNewProducts = (products: Product[]) => {
  const productsWithoutDiscount = products
    .filter(product => product.discount === 0);

  return productsWithoutDiscount
    .sort((p1, p2) => p2.price - p1.price);
};
