import { SliderProduct } from '../types/SliderProduct';

export function getBrandNewProducts(
  products: SliderProduct[],
): SliderProduct[] {
  return [...products].sort(
    (product1, product2) => product2.fullPrice - product1.fullPrice,
  );
}

export function getHotPricesProducts(
  products: SliderProduct[],
): SliderProduct[] {
  return [...products].sort((product1, product2) => {
    const discount1 = product1.fullPrice - product1.price;
    const discount2 = product2.fullPrice - product2.price;

    return discount2 - discount1;
  });
}
