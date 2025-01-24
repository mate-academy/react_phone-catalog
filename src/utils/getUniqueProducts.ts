import { Products } from '../types/Products';

export function getUniqueProducts(products: Products[]): Products[] {
  const uniqueProducts: { [key: string]: Products } = {};

  products.forEach(product => {
    const nameWithoutCapacity = product.name.replace(/\s\d+(GB|TB)/, '');
    uniqueProducts[nameWithoutCapacity] = product;
  });

  return Object.values(uniqueProducts);
}
