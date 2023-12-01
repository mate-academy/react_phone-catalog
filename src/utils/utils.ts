import { Product } from '../type/Product';

export function filterProducts(products: Product[]): Product[] {
  return products.sort((a, b) => b.price - a.price);
}

export function sortProductsByNewest(products: Product[]): Product[] {
  return [...products].sort((a, b) => b.year - a.year);
}

export function getHotPriceProducts(products: Product[]): Product[] {
  const hotPriceProducts = products
    .filter(product => product.price > 0)
    .sort((a, b) => Math.abs(a.price * (
    a.price / 100)) - Math.abs(b.price * (b.price / 100)));

  return hotPriceProducts;
}

export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}
