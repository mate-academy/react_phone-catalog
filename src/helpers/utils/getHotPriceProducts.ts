import { Product } from '../types/Product';

export const getHotPriceProducts = (products: Product[]) => {
  const hotPriceProducts = products.filter(product => product.discount);

  return hotPriceProducts.sort((product1, product2) => {
    const { price: price1, discount: discount1 } = product1;
    const { price: price2, discount: discount2 } = product2;

    const totalDiscount1 = (price1 / 100) * discount1;
    const totalDiscount2 = (price2 / 100) * discount2;

    return totalDiscount2 - totalDiscount1;
  });
};
