import { Product } from '../types/Product';

export function getMaxDifference(products: Product[], excluded: string) {
  const result = products
    .slice()
    .filter(product => !product.name.toLowerCase().includes(excluded))
    .sort((product1, product2) => {
      return (
        product2.fullPrice -
        product2.price -
        (product1.fullPrice - product1.price)
      );
    })
    .slice(0, 10);

  return result;
}
