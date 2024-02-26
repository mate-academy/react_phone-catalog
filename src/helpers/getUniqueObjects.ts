import { Product } from '../types/Product';

export function getUniqueObjects(array: Product[]) {
  const uniqueObjects: Product[] = [];
  const ids = new Set();

  array.forEach((obj: Product) => {
    if (!ids.has(obj.id)) {
      ids.add(obj.id);
      uniqueObjects.push(obj);
    }
  });

  return uniqueObjects;
}
