import { CAPACITY_FILTER, NEW_MODEL_YEAR } from '../constants/cardsSlider';
import { Product } from '../types/Product';

export function prepareFilteredProducts(products: Product[]) {
  const newProducts = products.filter(product => {
    const isNewYear = product.year === NEW_MODEL_YEAR;
    const matchesCapacity = product.name.includes(CAPACITY_FILTER);

    return isNewYear && matchesCapacity;
  });

  const discountProducts = products
    .filter(product => product.price < product.fullPrice)
    .sort((a, b) => b.fullPrice - a.fullPrice);

  return {
    newProducts,
    discountProducts,
  };
}
