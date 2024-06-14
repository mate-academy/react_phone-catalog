import { ProductGeneral } from '../types/ProductGeneral';

export function getCheapItems(products: ProductGeneral[]) {
  let difference = 80;

  products.forEach(product => {
    const diff = product.fullPrice - product.price;

    if (diff > difference) {
      difference = diff;
    }
  });

  return products
    .filter(
      (product, index) =>
        product.fullPrice - product.price < difference && index % 3 === 0,
    )
    .sort((item1, item2) => item2.fullPrice - item1.fullPrice);
}
