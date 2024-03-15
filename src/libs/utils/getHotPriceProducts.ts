import { IProduct } from '../types';

export const getHotPriceProducts = (products: IProduct[]) => {
  const productsWithAbsoluteDiscount = products
    .filter(product => product.price < product.fullPrice)
    .sort((pr1, pr2) => (
      (pr1.fullPrice - pr1.price) - (pr2.fullPrice - pr2.price)
    ));

  return productsWithAbsoluteDiscount;
};
