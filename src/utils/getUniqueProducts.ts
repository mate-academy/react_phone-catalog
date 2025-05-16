import { Product } from '../types/Product';

export function getUniqueProducts(products: Product[]): Product[] {
  const uniqueProducts: { [key: string]: Product } = {};

  products.forEach(product => {
    const nameWithoutCapacity = product.name.replace(/\s\d+(GB|TB)/, '');

    uniqueProducts[nameWithoutCapacity] = product;
  });

  return Object.values(uniqueProducts);
}
