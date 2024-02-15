import { CategoryName, Product } from '../types/product';

export function getBrandNewProducts(products: Product[]): Product[] {
  return products
    .sort((product1, product2) => product2.year - product1.year);
}

export function getHotPriceProducts(products: Product[]): Product[] {
  return products
    .filter(product => product.fullPrice > product.price)
    .sort((product1, product2) => {
      const discount1 = (product1.fullPrice - product1.fullPrice);
      const discount2 = (product2.fullPrice - product2.fullPrice);

      return discount2 - discount1;
    });
}

export function getPhones(products: Product[]): Product[] {
  return products
    .filter(product => product.type === CategoryName.phone);
}
