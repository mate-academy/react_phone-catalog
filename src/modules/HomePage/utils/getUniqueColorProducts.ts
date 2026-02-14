import { Product } from '../../../types/Product';

export function getUniqueColorProducts(products: Product[]) {
  return products.reduce((acc: Product[], item) => {
    const nameWithoutCapacity = item.name.replace(/\s\d+(GB|TB)/, '');

    if (
      !acc.some(t => t.name.replace(/\s\d+(GB|TB)/, '') === nameWithoutCapacity)
    ) {
      acc.push(item);
    }

    return acc;
  }, []);
}
