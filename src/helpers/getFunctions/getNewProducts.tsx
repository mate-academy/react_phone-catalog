import { Product } from '../../types/Product';

const YEAR = 2019;

export const getNewProducts = (productsFromServer: Product[]) => {
  const productsNew = productsFromServer.filter(product => (
    product.year >= YEAR
  ));

  return productsNew.sort((productFirst, productSecond) => (
    productFirst.price - productSecond.price
  ));
};
