import { SliderProduct } from '../types/SliderProduct';

export function getBrandNewProducts(
  products: SliderProduct[],
): SliderProduct[] {
  return [...products].sort(
    (product1, product2) => product2.fullPrice - product1.fullPrice,
  );
}
