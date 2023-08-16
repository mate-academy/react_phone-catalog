import { getPhones } from './getPhones';

import { Phone } from '../types/Phone';

export const getBrandNewProducts = () => {
  return getPhones()
    .then((products: Phone[]) => products
      .filter(product => product.year === 2019)
      .sort((product1, product2) => (
        product2.fullPrice - product1.fullPrice
      ))
      .slice(0, 12));
};
