import { IProduct } from '../types';

export const getHotPriceProducts = (products: IProduct[]) => {
  const productsWithAbsoluteDiscount = products
    .filter(product => product.discount > 0)
    .sort((pr1, pr2) => (
      pr1.price * (pr1.discount / 100) - pr2.price * (pr2.discount / 100)
    ));

  return productsWithAbsoluteDiscount;
};
