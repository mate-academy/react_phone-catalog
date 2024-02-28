import { IProduct } from '../types';

export const getBrandNewProducts = (products: IProduct[]) => {
  const productsWithoutDiscount = products
    .filter(product => !product.discount)
    .sort((pr1, pr2) => (
      pr1.price - pr2.price
    ));

  return productsWithoutDiscount;
};
