import { SliderProduct } from '../types/SliderProduct';

export function getBrandNewProducts(
  products: SliderProduct[],
): SliderProduct[] {
  return [...products].sort((product1, product2) => {
    const year1 = product1.year;
    const year2 = product2.year;

    return year2 - year1;
  });
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

export function getSuggestedProducts(
  products: SliderProduct[],
): SliderProduct[] {
  return [...products].sort(() => {
    return Math.random() > 0.5 ? 1 : -1;
  });
}
