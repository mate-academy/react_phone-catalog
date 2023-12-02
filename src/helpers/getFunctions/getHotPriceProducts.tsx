import { Product } from '../../types/Product';

const AMOUNT_PRICE = 80;

export const getHotProducts = (productsFromServer: Product[]) => {
  const productsWithDiscount = productsFromServer.filter(product => (
    product.fullPrice - product.price >= AMOUNT_PRICE
  ));

  return productsWithDiscount.sort((productFirst, productSecond) => {
    const amountFirst = productFirst.fullPrice - productFirst.price;
    const amountSecond = productSecond.fullPrice - productSecond.price;

    return amountSecond - amountFirst;
  });
};
