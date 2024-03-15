import { IProduct } from '../types';

export const getBrandNewProducts = (products: IProduct[]) => {
  const productsWithoutDiscount = products
    .filter(({ price, fullPrice }) => (
      !price || price === fullPrice
    ));

  const brandNewProducts = (
    productsWithoutDiscount.length
      ? productsWithoutDiscount
      : [...products]
  )
    .sort((pr1, pr2) => (
      pr2.price - pr1.price
    ));

  return brandNewProducts;
};
