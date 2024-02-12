import { Product } from '../types/product';

export function getBrandNewProducts(products: Product[]): Product[] {
  return products
    .filter(product => product.discount === 0)
    .sort((product1, product2) => product2.price - product1.price);
}

export function getHotPriceProducts(products: Product[]): Product[] {
  return products
    .filter(product => product.discount > 0)
    .sort((product1, product2) => {
      const discount1 = (product1.price * (100 - product1.discount)) / 100;
      const discount2 = (product2.price * (100 - product2.discount)) / 100;

      return discount2 - discount1;
    });
}
