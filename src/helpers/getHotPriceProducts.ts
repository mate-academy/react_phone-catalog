import { Product } from '../types/Product';

export const getHotPriceProducts = (products: Product[]) => {
  const productsWithDiscount = products
    .filter(product => product.discount > 0);

  const productsWithDiscountProp = productsWithDiscount.map(product => {
    const discountSum = (product.price * product.discount) / 100;

    return { ...product, discountSum };
  });

  return productsWithDiscountProp
    .sort((p1, p2) => p1.discountSum - p2.discountSum);
};
