import { MIN_DISCOUNT, MIN_FULLPRICE } from '../app/consts';
import { Product } from '../types/Product';

export const getHotPriceProducts = (products: Product[]) => (
  products.filter(({ price, fullPrice }) => {
    const discount = 100 - (price / (fullPrice / 100));

    return discount >= MIN_DISCOUNT;
  }).sort((product1, product2) => product1.price - product2.price)
);

export const getBrandNewProducts = (products: Product[]) => (
  products.filter(({ fullPrice }) => {
    const maxFullPrice = Math.max(fullPrice);

    return maxFullPrice >= MIN_FULLPRICE;
  })
    .sort((product1, product2) => (
      product2.fullPrice - product1.fullPrice
    ))
);

export const getSuggestedProducts = (
  products: Product[],
  group?: string,
  productOnScreen?: string,
) => {
  return products
    .filter(product => (product.category === group)
      && (productOnScreen !== product.itemId))
    .sort(() => Math.random() - 0.5);
};
