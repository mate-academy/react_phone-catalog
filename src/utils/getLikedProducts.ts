import { Product } from '../types/Product';

export function getLikedProducts(products: Product[], favs: string[]) {
  const result: Product[] = [];

  favs.forEach(id => {
    const exist = products.find(product => product.itemId === id);

    if (exist) {
      result.push(exist);
    }
  });

  return result;
}
