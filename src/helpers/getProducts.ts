import { Product } from '../types/Product';

export function getPhones(products: Product[]) {
  return products.filter(product => product.type === 'phone');
}

export function getTablets(products: Product[]) {
  return products.filter(product => product.type === 'tablet');
}

export function getAccessories(products: Product[]) {
  return products.filter(product => product.type === 'accessory');
}

export function getRandomProducts(
  products: Product[],
  currentProductId: string,
) {
  const result = [...products]
    .filter(product => product.id !== currentProductId);

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}
