import { Product } from '../types/Product';

export const getHotPriceProducts = (products: Product[]) => {
  const hotPriceProducts = products.filter(
    product => product.fullPrice - product.price > 0,
  );

  return hotPriceProducts.sort((product1, product2) => {
    const { price: price1, fullPrice: fullPrice1 } = product1;
    const { price: price2, fullPrice: fullPrice2 } = product2;

    const discount1 = fullPrice1 - price1;
    const discount2 = fullPrice2 - price2;

    return discount2 - discount1;
  });
};
