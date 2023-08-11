import { getProducts } from './getProducts';

import { ApiProduct } from '../types/ApiProduct';

export const getHotPriceProducts = () => {
  return getProducts()
    .then((products: ApiProduct[]) => products
      .filter(({ discount }) => discount > 0)
      .sort((product1, product2) => (
        product2.price * product2.discount - product1.price * product1.discount
      )));
};
