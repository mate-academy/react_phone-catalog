import { getPhones } from './getPhones';

import { Phone } from '../types/Phone';

export const getHotPriceProducts = () => {
  return getPhones()
    .then((products: Phone[]) => products
      .sort((product1, product2) => (
        product2.fullPrice - product1.fullPrice
          + product1.price - product2.price
      ))
      .slice(0, 12));
};
