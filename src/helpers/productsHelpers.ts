import { Product } from '../types/product';

export function getBrandNewProducts(products: Product[]): Product[] {
  return products
    .filter(product => product.year >= 2019)
    .sort((product1, product2) => product2.price - product1.price);
}

export function getHotPriceProducts(products: Product[]): Product[] {
  return products
    .sort((product1, product2) => {
      const discount1 = (product1.fullPrice - product1.price);
      const discount2 = (product2.fullPrice - product2.price);

      return discount2 - discount1;
    });
}

// export function getPhones(products: Product[]): Product[] {
//   return products
//     .filter(product => product.category === CategoryName.phone);
// }
