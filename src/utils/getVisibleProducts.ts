import { Product } from '../types/Product';
import { getShuffledArray } from './getShuffledArray';

export const getVisibleProducts = (
  products: Product[],
  discount: boolean,
  random: boolean,
) => {
  if (!products.length) {
    return [];
  }

  if (random) {
    const shuffled = getShuffledArray(products);

    return shuffled.slice(0, 10);
  }

  if (!discount) {
    let lastYearProduction = products[0].year;

    for (const item of products) {
      if (item.year > lastYearProduction) {
        lastYearProduction = item.year;
      }
    }

    return [...products]
      .filter(item => item.year === lastYearProduction)
      .sort((a, b) => b.fullPrice - a.fullPrice);
  }

  return [...products]
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .filter(item => item.fullPrice - item.price >= 100);
};
