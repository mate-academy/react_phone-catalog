import { client } from '../utils/httpClient';
import { Product } from '../types/Product';

export function getProducts(): Promise<Product[]> {
  return client.get('products.json');
}

export function getHotPriceProducts(products: Product[]): Product[] {
  return [...products]
    .filter(product => product.price && product.fullPrice)
    .sort((a, b) => {
      const bAbsDiscount = Math.abs(b.fullPrice - b.price);
      const aAbsDiscount = Math.abs(a.fullPrice - a.price);

      return bAbsDiscount - aAbsDiscount;
    });
}

export function getBrandNewProducts(products: Product[]): Product[] {
  return [...products]
    .filter(product => product.price && product.fullPrice)
    .sort((a, b) => b.price - a.price);
}
